<template>
  <div class="flex-1">
    <div
      v-if="isLoading"
      class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
    >
      <div v-for="i in 8" :key="i" class="w-full h-full rounded-lg border p-4 shadow-sm">
        <q-skeleton type="rect" height="160px" class="w-full rounded" />

        <q-skeleton type="text" class="w-full" />

        <q-skeleton type="text" class="w-full" />
        <q-skeleton type="text" class="w-3/4" />

        <div class="flex items-center justify-between gap-3">
          <q-skeleton type="text" width="100px" />
          <q-skeleton type="rect" width="100px" height="36px" />
        </div>
      </div>
    </div>
    <div v-else-if="isError">
      <ErrorBlock :error="error" :showRetry="true" @retry="refetch" />
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <article v-for="p in products" :key="p.id" class="h-full">
        <BaseCard>
          <template #header>
            <img :src="p.image" :alt="p.title" class="w-full h-40 object-contain rounded" />
          </template>

          <BaseText :text="p.title" level="base" class="mt-2 font-semibold line-clamp-2" />
          <p class="text-sm text-gray-600 line-clamp-2">{{ p.description }}</p>

          <template #footer>
            <div class="mt-2 flex flex-col gap-3">
              <div class="font-semibold text-green-600">{{ p.price }} $</div>

              <ProductCardActions :productId="p.id" :quantity="p.quantity" :product="p" />
            </div>
          </template>
        </BaseCard>
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseCard from '@/shared/ui/BaseCard/BaseCard.vue'
import { useRoute } from 'vue-router'
import { useGetProducts } from '../api/useGetProducts'
import { computed } from 'vue'
import type { ProductFromServerWithQuantity } from '../model/types.api'
import ErrorBlock from '@/shared/ui/ErrorBlock/ErrorBlock.vue'
import ProductCardActions from '@/features/UpdateCartItem/ui/ProductCardActions.vue'
import { useCart } from '@/shared/composables/useCart'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'

const route = useRoute()

const filters = computed(() => {
  const categoryQuery = route.query.category
  const searchQuery = route.query.search
  const minPriceQuery = route.query.minPrice
  const maxPriceQuery = route.query.maxPrice

  return {
    search: typeof searchQuery === 'string' ? searchQuery : undefined,
    category: Array.isArray(categoryQuery)
      ? categoryQuery
      : typeof categoryQuery === 'string'
        ? [categoryQuery]
        : undefined,
    minPrice:
      minPriceQuery && typeof minPriceQuery === 'string' ? Number(minPriceQuery) : undefined,
    maxPrice:
      maxPriceQuery && typeof maxPriceQuery === 'string' ? Number(maxPriceQuery) : undefined,
  }
})
const { data: productsFromServer, isLoading, isError, error, refetch } = useGetProducts(filters)
const { items: cartItems } = useCart()

const cartQuantityMap = computed(() => {
  const map = new Map<string, number>()

  for (const item of cartItems.value ?? []) {
    map.set(String(item.productId), item.quantity)
  }

  return map
})

const products = computed<ProductFromServerWithQuantity[]>(() =>
  (productsFromServer.value ?? []).map((p) => ({
    ...p,
    quantity: cartQuantityMap.value.get(String(p.id)) ?? 0,
  })),
)
</script>
