<template>
  <div>
    {{ greeting }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const greeting = ref('About')
</script>

<style scoped>
div {
  color: blue;
}
</style>
