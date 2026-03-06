import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './providers/router'
import './styles/style.css'
import vuetify from '@/plugins/vuetify'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
const queryClient = new QueryClient()

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, {
  queryClient,
})

app.mount('#app')
