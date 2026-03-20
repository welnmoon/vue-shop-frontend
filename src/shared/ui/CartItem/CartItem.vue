<template>
  <q-card flat bordered class="mx-auto py-4 px-4" :class="cardClass">
    <div class="flex gap-4">
      <q-img
        :src="cartItem.image"
        :alt="cartItem.title"
        style="width: 100px; min-width: 100px; height: 100px"
        fit="contain"
        class="rounded-md mb-4"
      />
      <div>
        <div class="text-lg font-semibold mb-1">{{ cartItem.title }}</div>
        <div class="text-sm text-zinc-600">{{ cartItem.description }}</div>
      </div>
    </div>

    <CartItemActions
      @increase="emit('increase', cartItem)"
      @decrease="emit('decrease', cartItem)"
      @remove="emit('remove', cartItem)"
      :item="cartItem"
    />
  </q-card>
</template>
<script lang="ts" setup>
import type { CartLine } from '@/entities/cart/model/types'
import CartItemActions from '@/features/UpdateCartItem/ui/CartItemActions.vue'
import { computed } from 'vue'

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
type Variant = (typeof variants)[number]

const props = defineProps<{
  cartItem: CartLine
  variant?: Variant
}>()

const cardClass = computed(() => {
  if (props.variant === 'elevated') return 'shadow-sm'
  if (props.variant === 'outlined') return 'border'
  return ''
})

const emit = defineEmits<{
  (e: 'increase', item: CartLine): void
  (e: 'decrease', item: CartLine): void
  (e: 'remove', item: CartLine): void
}>()
</script>
