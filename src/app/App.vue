<script setup lang="ts">
import Header from '@/widgets/header/header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <div class="layout">
      <Header />
      <main class="max-w-7xl mx-auto py-10">
        <RouterView />
      </main>
    </div>
  </v-app>
</template>

<style scoped></style>
