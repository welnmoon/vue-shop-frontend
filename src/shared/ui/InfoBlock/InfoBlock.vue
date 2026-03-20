<template>
  <div
    v-if="!uIStore.isBlockDismissed('cart-auth-info')"
    class="relative w-full flex flex-col items-center justify-center text-center border border-blue-200 bg-blue-50 rounded-lg p-8 gap-4"
  >
    <X
      v-if="canDismiss"
      @click="dismissBlock('cart-auth-info')"
      class="absolute top-2 right-2 cursor-pointer text-gray-400"
      title="Закрыть инфоблок"
    />
    <div class="text-blue-600">
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
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <div class="text-lg font-semibold text-blue-700">{{ title }}</div>

    <p class="text-sm text-blue-600 max-w-md">
      {{ text }}
    </p>

    <RouterLink v-if="actionText && actionTo" :to="actionTo">
      <q-btn color="primary" outline no-caps>
        {{ actionText }}
      </q-btn>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/app/stores/ui'
import { X } from 'lucide-vue-next'

const uIStore = useUIStore()
const dismissBlock = uIStore.dismissBlock

withDefaults(
  defineProps<{
    title?: string
    text: string
    actionText?: string
    actionTo?: string
    canDismiss?: boolean
  }>(),
  {
    title: 'Информация',
  },
)
</script>
