<template>
  <div v-if="product" className="p-10 border border-zinc-300 shadow">
    <h1 class="text-3xl font-semibold">{{ product.title }}</h1>
    <img :src="product.image" :alt="product.title" class="mt-4 w-full max-w-md rounded" />
    <p class="mt-4 text-gray-700">{{ product.description }}</p>
    <div class="mt-4 text-xl font-semibold">{{ product.price }} $</div>
    <div class="mt-2 text-sm text-gray-500">{{ product.category }}</div>
  </div>

  <div v-else className="text-red-600 h-full w-full flex items-center justify-center">
    Product Not found
  </div>
</template>

<script lang="ts" setup>
import { products } from '@/app/tempData'
import { computed } from 'vue'

const params = defineProps<{ id: string }>()

const product = computed(() => products.find((p) => p.id === params.id))
</script>

<style scoped></style>
