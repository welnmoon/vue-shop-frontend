<template>
  <div class="flex gap-4 items-start">
    <FilterSidebar />
    <ProductsList />
  </div>
</template>

<script lang="ts" setup>
import ProductsList from '@/entities/product/ui/ProductsList.vue'
import FilterSidebar from '@/widgets/filter-sidebar/FilterSidebar.vue'
import { ref } from 'vue'
</script>

<style scoped></style>
