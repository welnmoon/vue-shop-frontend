<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card v-if="isLoading" class="pa-6 text-center" rounded="lg">
          <v-progress-circular indeterminate />
          <div class="mt-4">Загружаем продукт...</div>
        </v-card>

        <v-alert v-else-if="isError" type="error" variant="tonal" rounded="lg" class="mb-4">
          Product not found
        </v-alert>

        <v-card v-else-if="product" rounded="lg" elevation="0">
          <v-row no-gutters>
            <v-col
              cols="12"
              md="5"
              class="pa-6 d-flex align-center justify-center bg-grey-lighten-4"
            >
              <v-img
                :src="product.image"
                :alt="product.title"
                max-width="320"
                max-height="320"
                contain
              />
            </v-col>

            <v-col cols="12" md="7">
              <v-card-text class="pa-6">
                <v-chip size="small" variant="tonal" class="mb-4">
                  {{ product.category }}
                </v-chip>

                <h1 class="text-h4 font-weight-bold mb-4">
                  {{ product.title }}
                </h1>

                <p class="text-body-1 text-medium-emphasis mb-6">
                  {{ product.description }}
                </p>

                <div class="text-h5 font-weight-bold mb-6">{{ product.price }} $</div>

                <div class="flex flex-wrap gap-2">
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
</script>
