<template>
  <section class="w-1/4 hidden md:block">
    <h2 class="h2">Filters</h2>
    <div>
      <h3>Search</h3>
      <input v-model="search" />
    </div>
    <div v-for="c in categories" :key="c">
      <label>
        <input type="checkbox" :value="c" v-model="category" />
        {{ c }}
      </label>
    </div>

    <div>
      <h3>Price</h3>
      <label for="price-min">От</label>
      <input id="price-min" type="number" v-model.number="minPrice" />
      <label for="price-max">До</label>
      <input id="price-max" type="number" :max="productsMaxPrice" v-model.number="maxPrice" />
    </div>

    <button @click="resetFilters" class="">Сбросить</button>
  </section>
</template>

<script lang="ts" setup>
import { categories, products } from '@/app/tempData'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productsMaxPrice = computed(() => products.reduce((max, p) => Math.max(max, p.price), 0))

const resetFilters = () => {
  router.replace({ query: { maxPrice: productsMaxPrice.value } })
}

const category = computed({
  get: () => route.query.category || [],
  set: (v: string[]) => {
    router.push({
      query: {
        ...route.query,
        category: v,
      },
    })
  },
})

const search = computed({
  get: () => route.query.search || '',
  set: (v: string) => {
    router.replace({
      query: {
        ...route.query,
        search: v,
      },
    })
  },
})

const minPrice = computed({
  get: () => route.query.minPrice || 0,
  set: (v: string) => {
    router.replace({
      query: {
        ...route.query,
        minPrice: v,
      },
    })
  },
})

const maxPrice = computed({
  get: () => route.query.maxPrice || productsMaxPrice.value,
  set: (v: string) => {
    router.replace({
      query: {
        ...route.query,
        maxPrice: v,
      },
    })
  },
})
</script>
