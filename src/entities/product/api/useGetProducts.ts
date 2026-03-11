import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { Product } from '../model/types.api'
import { computed, type ComputedRef } from 'vue'
import { productApi } from './api'
import type { LocationQueryValue } from 'vue-router'

type ProductsFilters = {
  search?: string
  category?: LocationQueryValue[] | string
  minPrice?: number
  maxPrice?: number
}

export const useGetProducts = (filters?: ComputedRef<ProductsFilters>) => {
  return useQuery({
    queryKey: computed(() => ['products', filters && filters.value]),
    queryFn: async () => {
      const params = new URLSearchParams()

      if (filters) {
        if (filters.value.search) {
          params.append('search', filters.value.search)
        }

        if (filters.value.category) {
          if (typeof filters.value.category === 'string') {
            params.append('category', filters.value.category)
          }

          if (Array.isArray(filters.value.category)) {
            filters.value.category.forEach((c) =>
              params.append('category', typeof c === 'string' ? c : ''),
            )
          }
        }

        if (filters.value.minPrice) {
          params.append('minPrice', String(filters.value.minPrice))
        }

        if (filters.value.maxPrice) {
          params.append('maxPrice', String(filters.value.maxPrice))
        }
      }

      const url = params.size
        ? `${productApi.getProducts.url()}?${params.toString()}`
        : productApi.getProducts.url()

      return httpClient<Product[]>(url, { method: 'GET' })
    },
  })
}
