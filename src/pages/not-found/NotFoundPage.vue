<script setup lang="ts">
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'
import Button from '@/shared/ui/Button/Button.vue'
</script>

<template>
  <section class="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <BaseText text="Страница не найдена" level="h1" />
    <p class="text-zinc-500">Проверьте адрес или вернитесь на главную страницу.</p>
    <RouterLink to="/">
      <Button variant="outline">На главную</Button>
    </RouterLink>
  </section>
</template>
