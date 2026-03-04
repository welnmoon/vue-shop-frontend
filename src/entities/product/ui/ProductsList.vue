<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <article
      v-for="p in products"
      :key="p.id"
      class="border border-zinc-300 text-zinc-800 rounded p-3"
    >
      <img :src="p.image" :alt="p.title" class="w-full h-40 object-cover rounded" />
      <h3 class="mt-2 font-semibold">{{ p.title }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2">{{ p.description }}</p>
      <div className="flex justify-between">
        <div class="mt-2 font-semibold text-green-600!">{{ p.price }} $</div>
        <RouterLink :to="`/product/${p.id}`">
          <button
            className="px-3 py-1 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 cursor-pointer transition-colors"
          >
            Купить
          </button>
        </RouterLink>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { products } from '@/app/tempData'
import { ref } from 'vue'
</script>

<style scoped>
/* Component-specific styles */
div {
  color: blue;
}
</style>
