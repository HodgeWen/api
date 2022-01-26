
import { DBContext } from '@/db'
import { FastifyInstance, RouteOptions } from 'fastify'
import { join } from 'path'

/**
 * 配置路由
 * @param routes 路由列表
 */
export function createRoute(prefix: string, routeFactory: (ctx: DBContext) => RouteOptions[]) {
  return function(server: FastifyInstance, ctx: DBContext) {
    let routes = routeFactory(ctx).map(route => {
      route.url = join(prefix, route.url)
      return route
    })
    routes.forEach(route => {
      server.route(route)
    })
  }

}
