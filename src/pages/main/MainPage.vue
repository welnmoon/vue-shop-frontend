<template>
  <div className="flex gap-4">
    <FilterSidebar />
    <ProductsList />
  </div>
</template>

<script lang="ts" setup>
import ProductsList from '@/entities/product/ui/ProductsList.vue'
import FilterSidebar from '@/widgets/filter-sidebar/FilterSidebar.vue'
import { ref } from 'vue'

const greeting = ref('Hello Vue!')
</script>

<style scoped></style>
