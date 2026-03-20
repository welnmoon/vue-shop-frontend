<script setup lang="ts">
import Header from '@/widgets/header/header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout min-h-screen">
    <Header />
    <main class="max-w-7xl mx-auto py-10">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
