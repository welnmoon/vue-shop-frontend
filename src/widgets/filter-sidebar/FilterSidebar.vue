<template>
  <section class="w-full md:w-64 shrink-0 self-start h-fit flex flex-col gap-4 md:sticky md:top-4">
    <h2>Filters</h2>
    <BaseInput v-model="search" type="text" label="Search" placeholder="Search..." />
    <div>
      <label class="block text-lg font-medium">Categories</label>
      <div class="flex flex-col gap-1">
        <div v-for="c in categories" :key="c">
          <BaseCheckboxMultiple :value="c" v-model="category">{{ c }}</BaseCheckboxMultiple>
        </div>
      </div>
    </div>

    <div>
      <h3>Price</h3>
      <BaseInput v-model="minPrice" :max="maxPrice" type="number" label="От" placeholder="От" />
      <BaseInput
        v-model="maxPrice"
        :min="minPrice"
        :max="String(productsMaxPrice)"
        type="number"
        label="До"
        placeholder="До"
      />
    </div>

    <Button variant="secondary" type="reset" @click="resetFilters">Reset</Button>
  </section>
</template>

<script lang="ts">
import { useGetProducts } from '@/entities/product/api/useGetProducts'
import { categories } from '@/entities/product/model/types'
import { useDebouncedRef } from '@/shared/composables/useDebouncedRef'
import { normalizePrice } from '@/shared/helpers/normalizePrice'
import BaseCheckboxMultiple from '@/shared/ui/BaseCheckboxMultiple/BaseCheckboxMultiple.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import Button from '@/shared/ui/Button/Button.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Option api

export default {
  data() {
    return {
      search: Array.isArray(this.$route.query.search)
        ? (this.$route.query.search[0] ?? '')
        : (this.$route.query.search ?? ''),
    }
  },
  setup() {
    const { data: products } = useGetProducts()
    const route = useRoute()
    const router = useRouter()
    const search = ref(
      Array.isArray(route.query.search)
        ? (route.query.search[0] ?? '')
        : (route.query.search ?? ''),
    )
    const debouncedSearch = useDebouncedRef(search, 500)

    watch(debouncedSearch, () => {
      router.replace({
        query: {
          search: debouncedSearch.value || undefined,
        },
      })
    })

    return {
      products,
      search,
      debouncedSearch,
      categories,
    }
  },
  components: { BaseCheckboxMultiple, BaseInput, Button },
  methods: {
    resetFilters() {
      this.$router.replace({
        query: {
          maxPrice: this.productsMaxPrice,
        },
      })
    },
  },
  watch: {
    debouncedSearch(value) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          search: value || undefined,
        },
      })
    },
  },
  computed: {
    productsMaxPrice() {
      return this.products?.reduce((max, p) => Math.max(max, p.price), 0) ?? 0
    },
    category: {
      get() {
        const q = this.$route.query.category
        if (Array.isArray(q)) return q.filter((x): x is string => typeof x === 'string')
        if (typeof q === 'string') return [q]
        return []
      },
      set(v: string[]) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            category: v.length ? v : undefined,
          },
        })
      },
    },
    minPrice: {
      get() {
        const v = this.$route.query.minPrice
        const cleaned = normalizePrice(!v ? '0' : String(v))

        return cleaned
      },
      set(v: string) {
        const cleaned = normalizePrice(v || '0')
        const currentMax = Number(this.maxPrice)

        let nextMinPrice = Number(cleaned || 0)
        if (nextMinPrice > currentMax) {
          nextMinPrice = currentMax
        }

        this.$router.replace({
          query: {
            ...this.$route.query,
            minPrice: String(nextMinPrice),
          },
        })
      },
    },
    maxPrice: {
      get() {
        const v = this.$route.query.maxPrice
        const cleaned = normalizePrice(!v ? String(this.productsMaxPrice) : String(v))

        return cleaned
      },
      set(v: string) {
        const cleaned = normalizePrice(v || String(this.productsMaxPrice))
        const currentMinPrice = Number(this.minPrice)

        let nextMaxPrice = Number(cleaned)

        if (nextMaxPrice < currentMinPrice) {
          nextMaxPrice = this.productsMaxPrice
        }

        this.$router.replace({
          query: {
            ...this.$route.query,
            maxPrice: String(nextMaxPrice),
          },
        })
      },
    },
  },
}

// const search = ref(
//   Array.isArray(route.query.search) ? (route.query.search[0] ?? '') : (route.query.search ?? ''),
// )
</script>
