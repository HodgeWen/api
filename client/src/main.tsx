import { createApp } from 'vue'
import { router } from '@/router'
import { RouterView } from 'vue-router'
import './styles/index.scss'

const app = createApp({
  render() {
    return <RouterView />
  }
})

app.use(router)

app.mount('#app')
