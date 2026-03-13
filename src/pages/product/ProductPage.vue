<template>
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%),radial-gradient(circle_at_bottom_right,#e2e8f0_0%,transparent_45%)]"
    ></div>

    <v-container class="relative py-8 md:py-10">
      <v-row justify="center">
        <v-col cols="12" md="11" lg="10">
          <v-card
            v-if="isLoading"
            rounded="xl"
            elevation="0"
            class="pa-8 text-center border border-zinc-200 bg-white/90 backdrop-blur-sm"
          >
            <v-progress-circular indeterminate color="blue" size="36" width="3" />
            <div class="mt-4 text-zinc-600">Загружаем продукт...</div>
          </v-card>

          <v-card
            v-else-if="isError"
            rounded="xl"
            elevation="0"
            class="pa-8 border border-red-200 bg-red-50 text-center"
          >
            <div class="text-red-700 text-lg font-semibold">Товар не найден</div>
            <div class="text-red-600 text-sm mt-2">Проверьте ссылку или вернитесь к каталогу.</div>
          </v-card>

          <v-card
            v-else-if="product"
            rounded="xl"
            elevation="0"
            class="overflow-hidden border border-zinc-200 shadow-sm"
          >
            <v-row no-gutters>
              <v-col cols="12" md="6" class="relative bg-gradient-to-br from-zinc-50 to-zinc-100 pa-6 md:pa-8">
                <div class="absolute top-4 left-4">
                  <v-chip size="small" variant="tonal" color="blue">
                    {{ product.category }}
                  </v-chip>
                </div>

                <div class="h-full min-h-[320px] flex items-center justify-center">
                  <v-img
                    :src="product.image"
                    :alt="product.title"
                    max-width="360"
                    max-height="360"
                    contain
                    class="drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </v-col>

              <v-col cols="12" md="6" class="bg-white">
                <v-card-text class="pa-6 md:pa-8 flex flex-col gap-6">
                  <div>
                    <div class="text-xs uppercase tracking-[0.16em] text-zinc-400 mb-2">Product</div>
                    <h1 class="text-3xl md:text-4xl font-semibold leading-tight text-zinc-900">
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
                    <v-btn color="primary" v-if="!isInCart" size="large" @click="addItem(product)">
                      {{ addItemPending ? 'Добавление...' : 'Добавить в корзину' }}
                    </v-btn>

                    <v-btn v-if="isInCart" @click="uiStore.toggleCartDrawer" variant="outlined">
                      В корзине {{ pQuantity }}
                    </v-btn>

                    <div v-if="isInCart">
                      <cart-item-actions
                        :item="cartItem"
                        @increase="increaseItem"
                        @decrease="decreaseItem"
                        @remove="removeItem"
                      />
                    </div>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
