import { httpClient } from '@/shared/api/httpClient'
import { useQuery } from '@tanstack/vue-query'
import type { ProductFromServer } from '../model/types.api'
import { computed, type ComputedRef, type MaybeRef } from 'vue'

type ProductsFilters = {
  search?: string
  category?: string[]
  minPrice?: number
  maxPrice?: number
}

export const useGetProducts = (filters: ComputedRef<ProductsFilters>) => {
  return useQuery({
    queryKey: computed(() => ['products', filters]),
    queryFn: async () => {
      const params = new URLSearchParams()

      if (filters.value.search) {
        params.append('search', filters.value.search)
      }

      if (filters.value.category) {
        filters.value.category.forEach((c) => params.append('category', c))
      }

      return httpClient<ProductFromServer[]>(`products?${params}`, { method: 'GET' })
    },
  })
}
