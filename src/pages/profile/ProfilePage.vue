<template>
  <section class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-3">
      <BaseText text="Профиль" level="h1" />
      <button
        @click="handleLogout"
        :disabled="logoutIsPending"
        class="rounded-md border border-zinc-300 px-4 py-2 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50"
      >
        {{ logoutIsPending ? 'Выходим...' : 'Выйти' }}
      </button>
    </div>

    <div v-if="currentUser?.email" class="text-sm text-zinc-500">{{ currentUser.email }}</div>

    <ErrorBlock v-if="logoutIsError" :error="logoutError" />

    <BaseText text="Заказы" level="h2" />

    <div v-if="ordersIsLoading" class="text-zinc-500">Загрузка заказов...</div>

    <ErrorBlock
      v-else-if="ordersIsError"
      :error="ordersError"
      :showRetry="true"
      @retry="refetchOrders"
    />

    <div v-else-if="!orders?.length" class="text-zinc-500">У вас пока нет заказов</div>

    <div v-else class="grid gap-4">
      <BaseCard v-for="order in orders" :key="order.id">
        <template #header>
          <div class="flex items-center justify-between gap-2 pb-2 border-b border-zinc-300">
            <BaseText :text="`Заказ #${order.id.slice(0, 8)}`" level="h3" />
            <span class="text-sm text-zinc-500">{{ formatDate(order.createdAt) }}</span>
          </div>
        </template>

        <div class="text-sm text-zinc-500">
          <span class="font-semibold text-zinc-800">Доставка:</span>
          {{ deliveryMethods[order.deliveryMethod] }}
        </div>
        <div class="text-sm text-zinc-500">
          <span class="font-semibold text-zinc-800">Оплата:</span>
          {{ paymentMethods[order.paymentMethod] }}
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center justify-between gap-2 text-sm border-b border-zinc-300 pb-2"
          >
            <div class="text-zinc-800">{{ item.product.title }} x{{ item.quantity }}</div>
            <div class="font-semibold text-zinc-800">{{ item.price * item.quantity }} $</div>
          </div>
        </div>

        <template #footer>
          <div class="pt-2 border-t border-zinc-300 flex items-center justify-between">
            <span class="text-zinc-500">Итого</span>
            <span class="font-semibold text-zinc-800">{{ getOrderTotal(order) }} $</span>
          </div>
        </template>
      </BaseCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { deliveryMethods, paymentMethods } from '@/entities/order/model/const'
import type { OrderWithItems } from '@/entities/order/model/types/order-user'
import { useGetOrders } from '@/entities/order/api/useGetOrders'
import { useGetCurrentUser } from '@/entities/user/api/useGetCurrentUser'
import { useLogout } from '@/entities/user/api/useLogout'
import BaseCard from '@/shared/ui/BaseCard/BaseCard.vue'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'
import ErrorBlock from '@/shared/ui/ErrorBlock/ErrorBlock.vue'

const { data: currentUser } = useGetCurrentUser()
const {
  mutate: submitLogout,
  isPending: logoutIsPending,
  isError: logoutIsError,
  error: logoutError,
} = useLogout()
const {
  data: orders,
  isLoading: ordersIsLoading,
  isError: ordersIsError,
  error: ordersError,
  refetch: refetchOrders,
} = useGetOrders()

const handleLogout = () => {
  submitLogout()
}

const formatDate = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString('ru-RU')
}

const getOrderTotal = (order: OrderWithItems) => {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
</script>
