<template>
  <section class="hidden md:w-64 shrink-0 sticky top-4 self-start h-fit md:flex md:flex-col gap-4">
    <h2>Filters</h2>
    <BaseInput v-model="search" type="text" label="Search" placeholder="Search..." />
    <div>
      <label class="block text-lg font-medium">Categories</label>
      <div class="flex flex-col gap-1">
        <div v-for="c in categories" :key="c">
          <BaseCheckbox :value="c" v-model="category">{{ c }}</BaseCheckbox>
        </div>
      </div>
    </div>

    <div>
      <h3>Price</h3>
      <BaseInput v-model="minPrice" type="number" label="От" placeholder="От" />
      <BaseInput v-model="maxPrice" type="number" label="До" placeholder="До" />
    </div>

    <Button variant="secondary" type="reset" @click="resetFilters">Reset</Button>
  </section>
</template>

<script lang="ts" setup>
import { categories, products } from '@/app/tempData'
import { useDebouncedRef } from '@/shared/composables/useDebouncedRef'
import BaseCheckbox from '@/shared/ui/BaseCheckbox/BaseCheckbox.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import Button from '@/shared/ui/Button/Button.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productsMaxPrice = computed(() => products.reduce((max, p) => Math.max(max, p.price), 0))

const resetFilters = () => {
  router.replace({ query: { maxPrice: productsMaxPrice.value } })
}

watch(
  () => route.query.search,
  (q) => {
    const v = (Array.isArray(q) ? q[0] : q) ?? ''
    search.value = v as string
  },
)

const category = computed<string[]>({
  get: () => {
    const q = route.query.category
    if (Array.isArray(q)) return q.filter((x): x is string => typeof x === 'string')
    if (typeof q === 'string') return [q]
    return []
  },
  set: (v) => {
    router.replace({
      query: {
        ...route.query,
        category: v.length ? v : undefined,
      },
    })
  },
})

const search = ref(
  (Array.isArray(route.query.search) ? route.query.search[0] : route.query.search) ?? '',
)

const debouncedSearch = useDebouncedRef(search, 500)

watch(debouncedSearch, (v) => {
  router.replace({
    query: {
      ...route.query,
      search: debouncedSearch.value || undefined,
    },
  })
})

const minPrice = computed<string>({
  get: () => {
    const v = route.query.minPrice
    return v === null ? '0' : String(v)
  },
  set: (v: string) => {
    router.replace({
      query: {
        ...route.query,
        minPrice: v,
      },
    })
  },
})

const maxPrice = computed<string>({
  get: () => {
    const v = route.query.maxPrice
    return v === null ? String(productsMaxPrice.value) : String(v)
  },
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
