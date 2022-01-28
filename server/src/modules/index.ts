import { createPlugin } from '../utils/helper'
import user from './user/controller'

const controllers = [user]

export default createPlugin(function (fastify, options, done) {
  controllers.forEach(controller => fastify.register(controller))
  done()
})
