import fastify from 'fastify'
import pino from 'pino'
import connectDB from './db'
import router from './router'

const start = async () => {
  const server = fastify({
    logger: pino({
      level: 'info',
      messageKey: 'message'
    })
  })

  const dbContext = await connectDB()

  router(server, dbContext)

  const address = await server.listen(2022).catch(err => {
    console.error(err)
    process.exit(1)
  })

  console.log(`服务正在运行， 地址：${address}`)
}

start()
