import { createApp } from 'vue'
import { darkTheme, NConfigProvider, NGlobalStyle } from 'naive-ui'
import App from './App.vue'

createApp({
  render() {
    return (
      <NConfigProvider theme={darkTheme}>
        <App />
        <NGlobalStyle />
      </NConfigProvider>
    )
  }
}).mount('#app')
