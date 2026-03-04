import AboutPage from '@/pages/about/AboutPage.vue'
import MainPage from '@/pages/main/MainPage.vue'
import ProductPage from '@/pages/product/ProductPage.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: MainPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/product/:id', name: 'product', component: ProductPage, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
