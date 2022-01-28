import { createModule } from '../../utils/helper'
import { UserBody, UserBodyType } from './schema'
import { hmacSHA256 } from '../../utils/crypto'

export default createModule('/user', fa => {
  const secret = 'six six six'

  fa.post<{ Body: UserBodyType }>(
    '/register',
    {
      schema: {
        body: UserBody
      }
    },
    async function (req, res) {
      // 给密码加密
      const user = hmacSHA256(req.body, ['password'], secret)
      const users = this.db.collection('users')
      if (await users.findOne({ account: user.account })) {
        res.code(400).send({
          msg: '账号已存在',
          code: 400,
          data: null
        })
        return
      }
      await users.insertOne(user)
      res.send(user)
    }
  )

  fa.post<{ Body: UserBodyType }>(
    '/login',
    {
      schema: {
        body: UserBody
      }
    },
    async function (req, res) {
      const user = hmacSHA256(req.body, ['password'], secret)
      const users = this.db.collection('users')
      const document = await users.findOne({
        account: user.account
      })
      if (!document || document.password !== user.password) {
        return res.code(400).send({
          msg: '账号或密码错误',
          code: 400,
          data: null
        })
      }
      res.send({ msg: '成功', data: document })
    }
  )
})
