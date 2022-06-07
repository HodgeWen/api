import fastify from 'fastify'
import db from './db'
import modules from './modules'
import chalk from 'chalk'

const start = async () => {
  const fa = fastify({
    logger: true
  })

  // await fa.register(db) // 注册数据库

  await fa.register(modules) // 注册所有的模块

  fa.ready(err => {
    err && console.error(err)
  })

  const address = await fa.listen(2022, 'localhost').catch(err => {
    console.error(err)
    process.exit(1)
  })

  console.log(`服务正在运行， 地址：${chalk.green(address)}`)
}

start()
