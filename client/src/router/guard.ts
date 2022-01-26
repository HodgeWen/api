import { Router } from 'vue-router'

export default function guard(router: Router) {
  router.beforeEach((to, from, next) => {
    next()
  })

  router.afterEach((to, from) => {
    document.title = to.meta?.title as string || '文档'
  })
}