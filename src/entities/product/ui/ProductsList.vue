<template>
  <div>
    <div v-if="isLoading">Loading</div>
    <div v-if="isError">Error {{ error }}</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <article class="h-full" v-for="p in productsFromServer ?? []" :key="p.id">
        TODO: Надо добавить типа если товар в корзине то кнопка "В корзине"
        <BaseCard>
          <template #header>
            <img :src="p.image" :alt="p.title" class="w-full h-40 object-contain rounded" />
          </template>

          <h3 class="mt-2 font-semibold line-clamp-2">{{ p.title }}</h3>
          <p class="text-sm text-gray-600 line-clamp-2">{{ p.description }}</p>

          <template #footer>
            <div class="flex justify-between">
              <div class="mt-2 font-semibold text-green-600!">{{ p.price }} $</div>
              <RouterLink :to="`/product/${p.id}`">
                <button
                  class="px-3 py-1 bg-zinc-800 text-white! rounded-lg hover:bg-zinc-700 cursor-pointer transition-colors"
                >
                  Купить
                </button>
              </RouterLink>
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

const route = useRoute()

const filters = computed(() => ({
  search: route.query.search as string | undefined,
  category: route.query.category as string[] | undefined,
  minPrice: route.query.minPrice ? Number(route.query.minPrice) : undefined,
  maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : undefined,
}))
const { data: productsFromServer, isLoading, isError, error } = useGetProducts(filters)
</script>
