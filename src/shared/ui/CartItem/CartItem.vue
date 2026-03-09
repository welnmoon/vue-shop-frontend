<template>
  <v-card :color="color" :variant="variant" class="mx-auto">
    <v-card-item>
      <div>
        <div class="text-label-medium text-uppercase mt-2 mb-3">
          {{ variant }}
        </div>
        <div class="text-title-large mb-1">{{ cartItem.product.title }}</div>
        <div class="text-body-small">{{ cartItem.product.description }}</div>
      </div>
    </v-card-item>

    <!-- <v-card-actions class="gap-2">
      <div>
        <v-btn @click="emit('decrease', cartItem.id)" icon
          ><MinusSquare :size="20" color="gray"
        /></v-btn>
        <span>{{ cartItem.quantity }}</span>
        <v-btn @click="emit('increase', cartItem.id)" icon
          ><PlusSquare :size="20" color="gray"
        /></v-btn>
        <v-btn @click="emit('remove', cartItem.id)"><Trash :size="20" color="red" /></v-btn>
      </div>
    </v-card-actions> -->
    <CartItemActions
      @increase="emit('increase', cartItem.id)"
      @decrease="emit('decrease', cartItem.id)"
      @remove="emit('remove', cartItem.id)"
      :id="cartItem.id"
      :quantity="cartItem.quantity"
    />
  </v-card>
</template>
<script lang="ts" setup>
import type { CartItem } from '@/entities/cart/model/types.api'
import CartItemActions from '@/features/UpdateCartItem/ui/CartItemActions.vue'
import { ref } from 'vue'

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
type Variant = (typeof variants)[number]
const color = ref('tonal')

const props = defineProps<{
  cartItem: CartItem
  variant?: Variant
}>()

const emit = defineEmits<{
  (e: 'increase', id: string): void
  (e: 'decrease', id: string): void
  (e: 'remove', id: string): void
}>()
</script>
