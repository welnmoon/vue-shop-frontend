<script setup lang="ts">
import Header from '@/widgets/header/header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <Header />
    <main class="layout">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
