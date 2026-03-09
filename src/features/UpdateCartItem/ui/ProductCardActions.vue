<script setup lang="ts">
import { useUIStore } from '@/app/stores/ui'

const props = defineProps<{
  productId: string
  quantity: number
}>()

const uiStore = useUIStore()
</script>

<template>
  <div class="flex gap-2">
    <RouterLink v-if="quantity < 1" :to="`/product/${productId}`">
      <v-btn variant="outlined" color="green" :style="{ color: 'white', backgroundColor: 'green' }"
        >Купить</v-btn
      >
    </RouterLink>

    <v-btn v-else variant="outlined" @click="uiStore.toggleCartDrawer">
      В корзине {{ quantity }}
    </v-btn>
  </div>
</template>
