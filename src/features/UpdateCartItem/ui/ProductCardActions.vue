<script setup lang="ts">
import { useUIStore } from '@/app/stores/ui'
import type { Product } from '@/entities/product/model/types.api'
import { useCart } from '@/shared/composables/useCart'

defineProps<{
  productId: string
  quantity: number
  product: Product
}>()

const uiStore = useUIStore()
const { addItem } = useCart()
</script>

<template>
  <div class="grid grid-cols-1 gap-2 w-full">
    <RouterLink :to="`/product/${productId}`" class="w-full">
      <v-btn
        :style="quantity === 0 && 'background-color: #22c55e'"
        variant="outlined"
        size="small"
        block
        >{{ quantity > 0 ? 'К продукту' : 'Купить' }}</v-btn
      >
    </RouterLink>

    <v-btn v-if="quantity < 1" size="small" block @click="addItem(product)">
      <i class="pi pi-shopping-cart"></i>
      Добавить в корзину
    </v-btn>

    <v-btn v-else variant="tonal" size="small" block @click="uiStore.toggleCartDrawer">
      <i class="pi pi-shopping-cart mr-2"></i>
      В корзине {{ quantity }}
    </v-btn>
  </div>
</template>
