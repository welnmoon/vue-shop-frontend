<template>
  <v-navigation-drawer
    width="400"
    :model-value="props.modelValue"
    temporary
    location="right"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="flex flex-col h-full">
      <div class="p-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Корзина</h2>
        <v-btn variant="text" @click="closeDrawer"><X /></v-btn>
      </div>

      <div class="overflow-auto flex flex-col gap-4">
        <div v-for="p in cartStore.items" :key="p.id">
          <cart-item
            @remove="handleRemove"
            @decrease="handleDecrease"
            @increase="handleIncrease"
            variant="elevated"
            :product="p"
          />
        </div>
      </div>

      <v-footer class="p-4 flex-1" elevation="3"
        ><span class="font-bold">Итого: </span> {{ cartStore.getCartPrice }} тг.
      </v-footer>
    </div>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useCartStore } from '@/app/stores/cart'
import { X } from 'lucide-vue-next'
import CartItem from '../CartItem/CartItem.vue'
import { onBeforeUnmount, watch } from 'vue'
import { lockScroll, unlockScroll } from '@/app/stores/ui'

const props = defineProps<{
  modelValue: boolean
}>()

const cartStore = useCartStore()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const closeDrawer = () => {
  emit('update:modelValue', false)
}

// cart

const handleIncrease = (id: string) => {
  cartStore.increaseItem(id)
}

const handleDecrease = (id: string) => {
  cartStore.decreaseItem(id)
}

const handleRemove = (id: string) => {
  cartStore.removeItem(id)
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  unlockScroll()
})
</script>
