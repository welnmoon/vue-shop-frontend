<script setup lang="ts">
import { useGetUserOrder } from '@/entities/order/api/useGetUserOrder'
import { deliveryMethods, paymentMethods } from '@/entities/order/model/const'
import type { OrderWithItems } from '@/entities/order/model/types/order-user'
import BaseCard from '@/shared/ui/BaseCard/BaseCard.vue'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'
import ErrorBlock from '@/shared/ui/ErrorBlock/ErrorBlock.vue'

const props = defineProps<{
  orderId: string
}>()

const {
  data: order,
  isLoading: orderIsLoading,
  isError: orderIsError,
  error: orderError,
  refetch: refetchOrder,
} = useGetUserOrder(props.orderId)

const formatDate = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString('ru-RU')
}

const getOrderTotal = (targetOrder: OrderWithItems) => {
  return targetOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <BaseText :text="`Заказ #${orderId.slice(0, 8)}`" level="h1" />

    <div v-if="orderIsLoading" class="text-zinc-500">Загрузка заказа...</div>

    <ErrorBlock v-else-if="orderIsError" :error="orderError" :showRetry="true" @retry="refetchOrder" />

    <div v-else-if="!order" class="text-zinc-500">Заказ не найден</div>

    <BaseCard v-else>
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
  </section>
</template>
