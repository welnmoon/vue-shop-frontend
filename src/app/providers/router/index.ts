import { getCurrentUser } from '@/entities/user/api/useGetCurrentUser'

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { queryClient } from '@/shared/api/queryClient'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/main/MainPage.vue') },
  { path: '/about', name: 'about', component: () => import('@/pages/about/AboutPage.vue') },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/pages/product/ProductPage.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/LoginPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register/RegisterPage.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile/ProfilePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/pages/checkout/CheckoutPage.vue'),
  },
  {
    path: '/orders/guest/:orderId',
    name: 'guest-order',
    component: () => import('@/pages/guest-order/GuestOrderPage.vue'),
    meta: { guestOnly: true },
    props: true,
  },
  {
    path: '/orders/:orderId',
    name: 'order-details',
    component: () => import('@/pages/order-details/OrderDetailsPage.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found/NotFoundPage.vue'),
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

  // if (to.meta.requiresAuth && !user) {
  //   return { name: 'login' }
  // }

  if (to.meta.guestOnly && user) {
    return { name: 'profile' }
  }

  if (to.name === 'guest-order' && user) {
    return { name: 'profile' }
  }

  if (to.name === 'order-details' && !user) {
    return { name: 'login' }
  }
})

export default router
