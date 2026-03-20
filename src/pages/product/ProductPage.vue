<template>
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%),radial-gradient(circle_at_bottom_right,#e2e8f0_0%,transparent_45%)]"
    ></div>

    <div class="relative py-8 md:py-10">
      <div class="mx-auto w-full max-w-6xl px-4">
        <q-card v-if="isLoading" flat bordered class="p-8 text-center border border-zinc-200 bg-white/90 backdrop-blur-sm">
          <q-spinner color="primary" size="36px" />
          <div class="mt-4 text-zinc-600">Загружаем продукт...</div>
        </q-card>

        <q-card v-else-if="isError" flat bordered class="p-8 border border-red-200 bg-red-50 text-center">
          <div class="text-red-700 text-lg font-semibold">Товар не найден</div>
          <div class="text-red-600 text-sm mt-2">Проверьте ссылку или вернитесь к каталогу.</div>
        </q-card>

        <q-card v-else-if="product" flat bordered class="overflow-hidden border border-zinc-200 shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="relative bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 md:p-8">
              <div class="absolute top-4 left-4">
                <q-chip color="primary" text-color="white" size="sm">
                  {{ product.category }}
                </q-chip>
              </div>

              <div class="h-full min-h-[320px] flex items-center justify-center">
                <q-img
                  :src="product.image"
                  :alt="product.title"
                  fit="contain"
                  class="drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  style="max-width: 360px; max-height: 360px; width: 100%"
                />
              </div>
            </div>

            <div class="bg-white">
                <q-card-section class="p-6 md:p-8 flex flex-col gap-6">
                  <div>
                    <div class="text-xs uppercase tracking-[0.16em] text-zinc-400 mb-2">Product</div>
                    <h1 class="text-2xl md:text-3xl font-semibold leading-tight text-zinc-900">
                      {{ product.title }}
                    </h1>
                  </div>

                <p class="text-base leading-relaxed text-zinc-600">
                  {{ product.description }}
                </p>

                <div class="flex items-end justify-between gap-3 border-y border-zinc-200 py-4">
                  <div>
                    <div class="text-xs uppercase tracking-wide text-zinc-400">Цена</div>
                    <div class="text-3xl font-bold text-zinc-900">{{ formatPrice(product.price) }} $</div>
                  </div>
                  <div class="text-xs text-zinc-400">С НДС</div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <q-btn v-if="!isInCart" color="primary" size="lg" no-caps @click="addItem(product)">
                    {{ addItemPending ? 'Добавление...' : 'Добавить в корзину' }}
                  </q-btn>

                  <q-btn v-if="isInCart" color="primary" outline no-caps @click="uiStore.toggleCartDrawer">
                    В корзине {{ pQuantity }}
                  </q-btn>

                  <div v-if="isInCart">
                    <CartItemActions
                      :item="cartItem"
                      @increase="increaseItem"
                      @decrease="decreaseItem"
                      @remove="removeItem"
                    />
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useUIStore } from '@/app/stores/ui'
import { useGetProduct } from '@/entities/product/api/useGetProduct'
import CartItemActions from '@/features/UpdateCartItem/ui/CartItemActions.vue'
import { useCart } from '@/shared/composables/useCart'

import { useCartProductQuantity } from '@/shared/composables/useCartProductQuantity'
import { computed } from 'vue'

const props = defineProps<{ id: string }>()

const { data: product, isLoading, isError } = useGetProduct(props.id)

const { increaseItem, decreaseItem, removeItem, getItem, addItemPending, addItem } = useCart()
const cartItem = computed(() => getItem(product.value))

const uiStore = useUIStore()

const { quantity: pQuantity, isInCart } = useCartProductQuantity(props.id)

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(value)
}
</script>
