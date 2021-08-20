import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'


export const router = createRouter({
  routes: [
    {
      path: '/',
      component: App,
    }
  ],

  history: createWebHistory()
})

