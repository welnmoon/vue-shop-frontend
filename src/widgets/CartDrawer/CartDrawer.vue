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
      <div v-if="items.length > 0" class="flex flex-col h-full">
        <div class="flex flex-col gap-4 flex-1">
          <div class="grid grid-cols-1 gap-4 p-4" v-if="isLoading">
            <div v-for="i in 8" :key="i" class="w-full h-full rounded-lg border p-4 shadow-sm">
              <div class="flex gap-2">
                <v-skeleton-loader type="image" height="160" class="w-1/3 rounded" />

                <div class="flex flex-col gap-2 flex-1">
                  <v-skeleton-loader type="heading" class="w-full" />

                  <v-skeleton-loader type="text" class="w-full" />
                  <v-skeleton-loader type="text" class="w-3/4" />
                </div>
              </div>

              <div class="flex items-center justify-between gap-3">
                <v-skeleton-loader type="text" width="100" />
                <v-skeleton-loader type="button" width="100" />
              </div>
            </div>
          </div>
          <InfoBlock
            :can-dismiss="true"
            v-else-if="!isAuthenticated"
            text="Войдите в аккаунт чтобы сохранить свою корзину"
            action-text="Перейти к логину"
            action-to="/login"
          />
          <div v-for="p in items" :key="p.productId">
            <CartItem
              @remove="removeItem"
              @decrease="decreaseItem"
              @increase="increaseItem"
              variant="elevated"
              :cart-item="p"
            />
          </div>
        </div>

        <div
          class="p-4 items-center h-fit justify-between shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]"
          elevation="3"
        >
          <div><span class="font-bold">Итоговая сумма: </span> {{ totalPrice }}</div>
          <div><span class="font-bold">Итого товаров: </span> {{ totalCount }}</div>
          <RouterLink to="/checkout"><Button variant="primary">Оформить заказ</Button> </RouterLink>
        </div>
      </div>

      <InfoBlock v-else title="Корзина пуста" text="Добавьте товары в корзину" />
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { lockScroll, unlockScroll } from '@/app/stores/ui'
import { useCart } from '@/shared/composables/useCart'
import Button from '@/shared/ui/Button/Button.vue'
import CartItem from '@/shared/ui/CartItem/CartItem.vue'
import InfoBlock from '@/shared/ui/InfoBlock/InfoBlock.vue'
import { X } from 'lucide-vue-next'
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
const {
  items,
  totalCount,
  totalPrice,
  decreaseItem,
  increaseItem,
  removeItem,
  isLoading,
  isAuthenticated,
} = useCart()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// drawer - UI
const closeDrawer = () => {
  emit('update:modelValue', false)
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
