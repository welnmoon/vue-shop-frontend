import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './providers/router'
import './styles/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
