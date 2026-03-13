<script setup lang="ts">
import type { CartLine } from '@/entities/cart/model/types'
import { MinusSquare, PlusSquare, Trash } from 'lucide-vue-next'

const props = defineProps<{
  item?: CartLine
}>()

const emit = defineEmits<{
  (e: 'increase', item: CartLine): void
  (e: 'decrease', item: CartLine): void
  (e: 'remove', item: CartLine): void
}>()
</script>

<template>
  <div v-if="item?.productId && item.quantity" class="flex items-center justify-between gap-6">
    <div class="flex gap-4">
      <button variant="flat" icon @click="emit('decrease', item)">
        <MinusSquare :size="20" />
      </button>

      <span>{{ item.quantity }}</span>

      <button variant="flat" icon @click="emit('increase', item)">
        <PlusSquare :size="20" />
      </button>
    </div>

    <button class="" variant="flat" icon @click="emit('remove', item)">
      <Trash :size="20" color="red" />
    </button>
  </div>
</template>
