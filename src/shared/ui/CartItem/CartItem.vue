<template>
  <v-card :color="color" :variant="variant" class="mx-auto">
    <v-card-item>
      <div>
        <div class="text-label-medium text-uppercase mt-2 mb-3">
          {{ variant }}
        </div>
        <div class="text-title-large mb-1">{{ product.title }}</div>
        <div class="text-body-small">{{ product.description }}</div>
      </div>
    </v-card-item>

    <v-card-actions class="gap-2">
      <div>
        <v-btn @click="emit('decrease', product.id)" icon
          ><MinusSquare :size="20" color="gray"
        /></v-btn>
        <span>{{ product.quantity }}</span>
        <v-btn @click="emit('increase', product.id)" icon
          ><PlusSquare :size="20" color="gray"
        /></v-btn>
        <v-btn @click="emit('remove', product.id)"><Trash :size="20" color="red" /></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import type { CartItem } from '@/app/stores/cart'
import { MinusSquare, PlusSquare, Trash } from 'lucide-vue-next'
import { ref } from 'vue'

const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
type Variant = (typeof variants)[number]
const color = ref('tonal')

const props = defineProps<{
  product: CartItem
  variant?: Variant
}>()

const emit = defineEmits<{
  (e: 'increase', id: string): void
  (e: 'decrease', id: string): void
  (e: 'remove', id: string): void
}>()
</script>
