import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './providers/router'
import './styles/style.css'
import vuetify from '@/plugins/vuetify'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '../shared/api/queryClient'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, {
  queryClient,
})

app.mount('#app')
