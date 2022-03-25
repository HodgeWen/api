import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import guard from './guard'

export const router = createRouter({
  routes,
  history: ENV === "desktop" ? createWebHashHistory() : createWebHistory()
})

// guard(router)


