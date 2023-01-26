import { readFile, writeFile, cp, rm, unlink, readdir } from 'fs/promises'
import { resolve, dirname } from 'path'

import type { OutputOptions } from 'rollup'
interface AssetInfo {
  fileName: string
}

const PORTAL_JS_REGEX = /portal-[a-f0-9]+\.js/

const removeAssets = async (dir: string) => {
  const files = await readdir(dir, { withFileTypes: true })
  const filesToDelete = files.filter(i => i.isFile() && !(i.name.includes('static.') || i.name === 'favicon.ico'))
  for (const file of filesToDelete) {
    await unlink(resolve(dir, file.name))
  }
}

const writeHash = async (path: string, hash: string) => {
  const data = await readFile(path)
  const { current } = JSON.parse(data.toString())
  current.dev = false
  current.hash = hash
  await writeFile(path, JSON.stringify({ current }, null, 2))
}

const removeViteTemplates = async (dir: string, files: string[]) => {
  for (const file of files) {
    const path = resolve(dir, file)
    const fileDir = dirname(path)
    if (fileDir !== dir) {
      // remove dir
      await rm(fileDir, { recursive: true, force: true })
      console.log('> removed', fileDir)
    } else {
      // remove file
      await unlink(path)
      console.log('> removed', path)
    }
  }
}

const copyPortalJS = async (dir: string, file: string | undefined) => {
  if (!file) {
    throw new Error('Could not copy portal javascript, portal.js not found.')
  }
  await cp(resolve(dir, file), resolve(dir, 'portal.js'))
}

export default (hash: string) => {
  return {
    name: 'shopify-normalize',
    async renderStart ({ dir }) {
      await removeAssets(dir)
      await writeHash(resolve(dir, '../config/settings_data.json'), hash)
    },
    async writeBundle ({ dir }: OutputOptions, bundle: { [fileName: string]: AssetInfo }) {
      if (dir) {
        const files = Object.keys(bundle)
        await removeViteTemplates(dir, files.filter(i => i.endsWith('.html')))
        await copyPortalJS(dir, files.find(i => PORTAL_JS_REGEX.test(i)))
      }
    }
  }
}
