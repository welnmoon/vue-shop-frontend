<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <header class="w-full border-b bg-white">
    <div class="w-full px-4">
      <div class="max-w-7xl mx-auto flex items-center h-16 gap-6 md:gap-10 lg:gap-16">
        <div class="text-xl font-semibold shrink-0">Vue Shop</div>

        <nav class="flex gap-4 md:gap-6 text-gray-700">
          <RouterLink to="/" class="hover:text-black">Home</RouterLink>
          <RouterLink to="/about" class="hover:text-black">About</RouterLink>
          <RouterLink to="/" class="hover:text-black">Contact</RouterLink>
        </nav>

        <div class="flex items-center gap-3 md:gap-4 ml-auto">
          <i class="pi pi-user cursor-pointer"></i>
          <i class="pi pi-shopping-cart cursor-pointer"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
