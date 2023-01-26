import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import {
  commit,
  combineCss,
  shopify
} from './src/plugins/vite'

const envDir = resolve(__dirname, './')

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, envDir) }

  const hash = commit()

  return defineConfig({
    base: process.env.VITE_BASE_URL,
    plugins: [
      vue(),
      combineCss(hash),
      shopify(hash)
    ],
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler',
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      postcss: './postcss.config.js'
    },
    build: {
      minify: true,
      target: 'es2020',
      emptyOutDir: false,
      outDir: './shopify/assets',
      rollupOptions: {
        manualChunks (id) {
        //   // Sample data for local dev
          if (id.match(/test\/.*\.json/)) {
            return 'data'
          }
          // SFC Styles
          if (id.includes('type=style')) {
            if (id.includes('/portal/')) {
              return 'portal'
            } else {
              return 'vue-styles'
            }
          }
        },
        input: {
          theme: resolve(__dirname, './index.html')
        },
        output: {
          validate: true,
          entryFileNames: `[name]-${hash}.js`,
          chunkFileNames: `[name]-${hash}.js`,
          assetFileNames: `[name]-${hash}.[ext]`
        }
      }
    }
  })
}

