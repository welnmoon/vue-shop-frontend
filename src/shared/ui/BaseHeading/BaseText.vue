<template>
  <component :is="headings[level].tag" :class="headings[level].style">
    {{ text }}
  </component>
</template>

<script lang="ts" setup>
const headings = {
  h1: {
    style: 'text-4xl font-bold text-zinc-800',
    tag: 'h1',
  },
  h2: {
    style: 'text-2xl font-bold text-zinc-800',
    tag: 'h2',
  },
  h3: {
    style: 'text-lg font-bold text-zinc-800',
    tag: 'h3',
  },
  base: {
    style: 'text-base font-medium text-zinc-800',
    tag: 'p',
  },
  sm: {
    style: 'text-sm font-bold text-zinc-500',
    tag: 'p',
  },
  xs: {
    style: 'text-xs font-bold text-zinc-500',
    tag: 'p',
  },
} as const

type HeadingLevel = keyof typeof headings

defineProps<{
  level: HeadingLevel
  text: string
}>()
</script>
