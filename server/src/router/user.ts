import { createRoute } from '@/utils/helper'

const user = createRoute('/user', ({ db }) => {
  const {  } = db.collection
  return [
    // 用户注册
    {
      url: '/register',
      method: 'POST',
      handler: (req, res) => {}
    },

    // 用户登录
    {
      url: '/login',
      method: 'POST',
      handler: (req, res) => {}
    }
  ]
})

export default user
