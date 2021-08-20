import { createApp } from 'vue'
import { darkTheme, NConfigProvider, NGlobalStyle } from 'naive-ui'
import { router } from '@/router'

import App from './App.vue'

const app = createApp({
  render() {
    return (
      <NConfigProvider theme={darkTheme}>
        <App />
        <NGlobalStyle />
      </NConfigProvider>
    )
  }
})

app.use(router)

app.mount('#app')
