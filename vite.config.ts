import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import {
  shopify
} from './src/plugins/vite'

const envDir = resolve(__dirname, './')

export default ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, envDir) }

  const digest = new Date().getTime().toString()

  return defineConfig({
    base: process.env.VITE_BASE_URL,
    plugins: [
      vue(),
      shopify(digest)
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
      target: 'es2020',
      minify: false,
      emptyOutDir: false,
      outDir: './shopify/assets',
      rollupOptions: {
        input: {
          theme: resolve(__dirname, './index.html')
        },
        output: {
          validate: true,
          entryFileNames: `vite-[name]-${digest}.js`,
          chunkFileNames: `vite-[name]-${digest}.js`,
          assetFileNames: `vite-[name]-${digest}.[ext]`
        }
      }
    }
  })
}

