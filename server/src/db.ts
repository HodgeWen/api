import { Db, MongoClient } from 'mongodb'

export interface DBContext {
  db: Db,
  client: MongoClient
}

export default async function connectDB() {
  const url = 'mongodb://localhost:27017'

  const client = new MongoClient(url)

  const dbName = 'users'

  await client.connect()

  console.log('数据库连接成功')

  const db = client.db(dbName)

  return {
    db,
    client
  }
}
