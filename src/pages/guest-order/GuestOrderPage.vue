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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{ orderId: string }>()

const orderId = computed(() => props.orderId)
const token = computed(() => {
  if (route.query.token) {
    return route.query.token as string
  }

  return getGuestOrderAccess(orderId.value)?.token
})

const { data: order, isLoading, isError, error } = useGetGuestOrder(orderId, token)
console.log(order)
</script>
