import { Db, MongoClient } from 'mongodb'
import { createPlugin } from './utils/helper'
import { createClient, RedisClientType, RedisModules, RedisScripts } from 'redis'

declare module 'fastify' {
  interface FastifyInstance {
    /** 当前连接的数据库 */
    db: Db
    /** mongoDb客户端 */
    client: MongoClient,
    /** redis客户端 */
    redis: RedisClientType<RedisModules, RedisScripts>
  }
}

export default createPlugin(async function (fa, options, next) {
  fa.addHook('onClose', () => {
    mongoClient.close()
  })

  const mongoClient = await MongoClient.connect('mongodb://127.0.0.1:27017')
  console.log('mongodb数据库连接成功')
  const dbName = 'api'
  const db = mongoClient.db(dbName)
  fa.decorate('db', db)
  fa.decorate('mongoClient', mongoClient)

  const redisClient = createClient({
    url: 'redis://118.190.140.38:4052'
  })
  type C = typeof redisClient
  await redisClient.connect()
  console.log('redis数据库链接成功')
  fa.decorate('redis', redisClient)

  next()
})
