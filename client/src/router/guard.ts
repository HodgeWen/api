import { local, TOKEN } from '@/cache'
import { Router } from 'vue-router'

export default function guard(router: Router) {
  const whiteList = new Set(['/login'])
  const hasLogin = () => !!local.get(TOKEN)

  router.beforeEach((to, from, next) => {
    // 已登录
    if (hasLogin()) {
      if (to.path === '/login') {
        return next({ path: from.path, replace: true })
      }
      return next()
    }

    // 未登录
    if (whiteList.has(to.path)) {
      return next()
    }

    next({ path: 'login', replace: true })
  })

  router.afterEach((to, from) => {
    document.title = to.meta?.title as string || '文档'
  })
}