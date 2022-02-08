import path from 'path'
import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue' // 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx' // TSX和JSX支持
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/** 开发环境配置 */
const serveConfig: UserConfigExport = {}

/** 生产环境配置 */
const buildConfig: UserConfigExport = {}

export default defineConfig(context => {
  const { command, mode } = context

  const commonConfig: UserConfigExport = {
    plugins: [
      vue({
        reactivityTransform: true
      }),
      vueJsx(),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],

    define: {
      ENV: JSON.stringify(mode)
    },

    resolve: {
      alias: {
        '@': path.resolve('./src')
      },
      extensions: ['.ts', '.tsx', '.mjs', '.json']
    },

    server: {
      port: 2000,
      open: false,
      host: true,

      proxy: {
        '/dev': {
          target: 'http://localhost:2022',
          rewrite: s => s.replace(/^\/dev/, '')
        }
      }
    }
  }

  return commonConfig
})
