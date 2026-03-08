import { getCurrentUser, useGetCurrentUser } from '@/entities/user/api/useGetCurrentUser'
import AboutPage from '@/pages/about/AboutPage.vue'
import LoginPage from '@/pages/login/LoginPage.vue'
import MainPage from '@/pages/main/MainPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import ProductPage from '@/pages/product/ProductPage.vue'
import RegisterPage from '@/pages/register/RegisterPage.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { queryClient } from '@/app/main'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: MainPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/product/:id', name: 'product', component: ProductPage, props: true },
  { path: '/login', name: 'login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: RegisterPage, meta: { guestOnly: true } },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const needsAuthCheck = to.meta.requiresAuth || to.meta.guestOnly

  if (!needsAuthCheck) {
    return
  }

  const user = await queryClient.fetchQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  })

  if (to.meta.requiresAuth && !user) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && user) {
    return { name: 'profile' }
  }
})

export default router
