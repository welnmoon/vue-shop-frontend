<template>
  <div>
    <ProductsList />
  </div>
</template>

<script lang="ts" setup>
import ProductsList from '@/entities/product/ui/ProductsList.vue'
import { ref } from 'vue'

const greeting = ref('Hello Vue!')
</script>

<style scoped></style>
