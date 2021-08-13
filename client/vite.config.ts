import path from 'path'
import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue' // 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx' // TSX和JSX支持
import viteComponents, { NaiveUiResolver } from 'vite-plugin-components' // 组件自动导入

/** 开发环境配置 */
const serveConfig: UserConfigExport = {

}

/** 生产环境配置 */
const buildConfig: UserConfigExport = {

}


export default defineConfig(context => {
  const { command, mode } = context

  const commonConfig: UserConfigExport = {
    plugins: [
      vue(),
      vueJsx(),
      viteComponents({
        globalComponentsDeclaration: true,
        customComponentResolvers:[
          NaiveUiResolver()
        ]
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
      open: false
    }
  }

  return commonConfig
})
