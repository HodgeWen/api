import { RouteRecordRaw } from "vue-router"
import Layout from '@/pages/layout/main.vue'
import Workspace from '@/pages/workspace/main.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/main.vue'),
    meta: {
      title: '登录'
    }
  },

  {
    path: '/workspace',
    component: Workspace,
    meta: { title: '工作空间' }
  },

  {
    path: '/',
    component: Layout,
    children: [

    ]
  }
]

export default routes