<template>
  guest-order

  <pre>{{ order }}</pre>

  <ErrorBlock v-if="isError" :error="error" />

  <div v-else-if="isLoading">Loading...</div>
</template>

<script setup lang="ts">
import { useGetGuestOrder } from '@/entities/order/api/useGetGuestOrder'
import { getGuestOrderAccess } from '@/features/CreateOrder/lib/guest-order'
import ErrorBlock from '@/shared/ui/ErrorBlock/ErrorBlock.vue'

const props = defineProps<{ orderId: string }>()
const token = getGuestOrderAccess(props.orderId)?.token

const { data: order, isLoading, isError, error } = useGetGuestOrder(props.orderId, token)
console.log(order)
</script>
