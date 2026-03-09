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

                <!-- <div class="flex flex-wrap gap-2">
                  <v-btn
                    color="primary"
                    size="large"
                    @click="product && cartStore.addItem(product)"
                  >
                    {{ isInCart ? 'Добавлено в корзину' : 'Добавить в корзину' }}
                  </v-btn>

                  <v-btn v-if="isInCart" variant="outlined"> Перейти в корзину </v-btn>
                </div> -->
                <div class="flex flex-wrap gap-2">
                  <v-btn color="primary" size="large" @click="onCartItemCreate">
                    {{ isPending ? 'Добавление...' : 'Добавить в корзину' }}
                  </v-btn>

                  <v-btn v-if="isInCart" variant="outlined"> Перейти в корзину </v-btn>
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
import { useCartStore } from '@/app/stores/cart'
import { useGetProduct } from '@/entities/product/api/useGetProduct'
import { useAddCartItem } from '@/features/CreateCartItem/api/useAddCartItem'
import { computed } from 'vue'

const props = defineProps<{ id: string }>()

const { data: product, isLoading, isError } = useGetProduct(props.id)
const cartStore = useCartStore()
const { mutate, isPending, isError: addCartItemError } = useAddCartItem()
const onCartItemCreate = () => {
  if (product.value) {
    mutate({ productId: product.value?.id, quantity: 1 })
  } else alert('Product not found')
}

const pQuantity = computed(() => cartStore.getItemQuantity(props.id))
const isInCart = computed(() => (pQuantity.value ? pQuantity.value > 0 : false))
</script>
