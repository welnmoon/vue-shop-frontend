<template>
  <div
    class="w-full flex flex-col items-center justify-center text-center border border-red-200 bg-red-50 rounded-lg p-8 gap-4"
  >
    <div class="text-red-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-10 h-10 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01M12 3L2 21h20L12 3z"
        />
      </svg>
    </div>

    <div class="text-lg font-semibold text-red-700">Что-то пошло не так</div>

    <p class="text-sm text-red-600 max-w-md">
      Мы уже разбираемся с проблемой. Попробуйте обновить страницу или повторить запрос немного
      позже.
    </p>

    <v-btn v-if="showRetry" color="red" variant="outlined" @click="$emit('retry')">
      Попробовать снова
    </v-btn>

    <div v-if="error" class="text-xs text-red-500 mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error?: unknown
  showRetry?: boolean
}>()

defineEmits<{
  retry: []
}>()
</script>
