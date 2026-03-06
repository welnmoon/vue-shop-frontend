<script setup lang="ts">
import Header from '@/widgets/header/header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <div class="layout">
      <Header />
      <main class="main">
        <RouterView />
      </main>
    </div>
  </v-app>
</template>

<style scoped></style>
