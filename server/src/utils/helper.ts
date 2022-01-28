import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

/**
 * 创建一个路由模块, 模块中所有的路由共用一个公共的前缀
 * @param prefix 前缀
 * @param fn 插件
 */
export function createModule<T extends FastifyPluginOptions = Record<never, never>>(
  prefix: string,
  fn: FastifyPluginCallback // 需要在之后调用
): FastifyPluginCallback<T> {
  return (fa, options, done) => {
    // 给模块加上路由前缀
    fa.register(
      async (child, childOptions, next) => {
        fn(child, childOptions, next)
        next()
      },
      { prefix }
    )

    done()
  }
}

/**
 * 创建一个全局范围的插件
 * @param fn 插件处理函数
 */
export function createPlugin<T = {}>(fn: FastifyPluginCallback<T>) {
  return fp<T>(fn)
}
