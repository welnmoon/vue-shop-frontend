<script setup lang="ts">
import { useUIStore } from '@/app/stores/ui'
import type { Product } from '@/entities/product/model/types.api'
import { useCart } from '@/shared/composables/useCart'

defineProps<{
  productId: string | number
  quantity: number
  product: Product
}>()

const uiStore = useUIStore()
const { addItem } = useCart()
</script>

<template>
  <div class="grid grid-cols-1 gap-2 w-full">
    <RouterLink :to="`/product/${productId}`" class="w-full">
      <q-btn
        :color="quantity === 0 ? 'positive' : 'primary'"
        :outline="quantity > 0"
        size="sm"
        class="full-width"
        no-caps
      >
        {{ quantity > 0 ? 'К продукту' : 'Купить' }}
      </q-btn>
    </RouterLink>

    <q-btn v-if="quantity < 1" color="positive" size="sm" class="full-width" no-caps @click="addItem(product)">
      <i class="pi pi-shopping-cart"></i>
      Добавить в корзину
    </q-btn>

    <q-btn v-else color="primary" outline size="sm" class="full-width" no-caps @click="uiStore.toggleCartDrawer">
      <i class="pi pi-shopping-cart mr-2"></i>
      В корзине {{ quantity }}
    </q-btn>
  </div>
</template>
