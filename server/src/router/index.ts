import { DBContext } from '@/db'
import { FastifyInstance } from 'fastify'

import user from './user'

const routeFactories = [user]

export default function router(server: FastifyInstance, dbContext: DBContext) {

  routeFactories.forEach(factory => factory(server, dbContext))
}
