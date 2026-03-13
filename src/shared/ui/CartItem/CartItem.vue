<template>
  <v-card :color="color" :variant="variant" class="mx-auto py-4 px-4">
    <div class="flex gap-4">
      <v-img
        :src="cartItem.image"
        :alt="cartItem.title"
        max-width="100"
        min-width="100"
        class="rounded-md mb-4"
      ></v-img>
      <div>
        <div class="text-title-large mb-1">{{ cartItem.title }}</div>
        <div class="text-body-small">{{ cartItem.description }}</div>
      </div>
    </div>

    <CartItemActions
      @increase="emit('increase', cartItem)"
      @decrease="emit('decrease', cartItem)"
      @remove="emit('remove', cartItem)"
      :item="cartItem"
    />
  </v-card>
</template>
<script lang="ts" setup>
import type { CartLine } from '@/entities/cart/model/types'
import CartItemActions from '@/features/UpdateCartItem/ui/CartItemActions.vue'
import { ref } from 'vue'

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
type Variant = (typeof variants)[number]
const color = ref('tonal')

const props = defineProps<{
  cartItem: CartLine
  variant?: Variant
}>()

const emit = defineEmits<{
  (e: 'increase', item: CartLine): void
  (e: 'decrease', item: CartLine): void
  (e: 'remove', item: CartLine): void
}>()
</script>
