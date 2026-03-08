<template>
  <p class="text-red-600 text-sm">
    <slot>{{ text }}</slot>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>
