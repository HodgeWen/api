import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/main.vue'),
    meta: {
      title: '登录'
    }
  }
]

export default routes