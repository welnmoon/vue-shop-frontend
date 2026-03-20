<template>
  <section class="auth-page flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <q-card class="p-2 rounded-xl shadow-md" flat bordered>
        <q-card-section class="pb-2">
          <BaseText :text="title" level="h2" />

          <div v-if="subtitle" class="pt-1 text-sm text-zinc-500">
            {{ subtitle }}
          </div>
        </q-card-section>

        <q-card-section>
          <slot />
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseText from '../BaseHeading/BaseText.vue'

defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
}
</style>
