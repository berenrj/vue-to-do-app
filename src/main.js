import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')

// old code from prior to adding routes
//createApp(App).mount('#app')
