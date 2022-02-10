import { compare } from 'bcrypt'
import { bcryptHash } from '../..//utils/crypto'
import { createModule } from '../../utils/helper'
import { UserBody, UserBodyType } from './schema'

export default createModule('/user', fa => {
  // 账号注册
  fa.post<{ Body: UserBodyType }>(
    '/register',
    {
      schema: {
        body: UserBody
      }
    },
    async function (req, res) {
      // 加密存储
      const user = await bcryptHash(req.body, ['password'])

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

  // 登录返回一个token给到前端
  fa.post<{ Body: UserBodyType }>(
    '/login',
    {
      schema: {
        body: UserBody
      }
    },
    async function (req, res) {
      const user = req.body
      const users = this.db.collection('users')
      const document = await users.findOne({
        account: user.account
      })

      let matched = document && (await compare(user.password, document.password))

      if (!matched) {
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
