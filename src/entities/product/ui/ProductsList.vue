<template>
  <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    <article class="h-full" v-for="p in filteredProducts" :key="p.id">
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
</template>

<script lang="ts" setup>
import { products } from '@/app/tempData'
import BaseCard from '@/shared/ui/BaseCard/BaseCard.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const filteredProducts = computed(() => {
  const search = ((route.query.search as string) || '').toLocaleLowerCase()
  const category = route.query.category as string[]
  const minPrice = Number(route.query.minPrice) || 0
  const maxPrice = Number(route.query.maxPrice) || 0

  return products.filter((p) => {
    if (search && !p.title.toLocaleLowerCase().includes(search)) return false

    if (category && !category.includes(p.category)) return false

    if (minPrice && p.price < minPrice) return false

    if (maxPrice && p.price > maxPrice) return false

    return true
  })
})
</script>
