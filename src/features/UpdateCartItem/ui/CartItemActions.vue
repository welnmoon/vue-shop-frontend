<script setup lang="ts">
import { MinusSquare, PlusSquare, Trash } from 'lucide-vue-next'

const props = defineProps<{
  id?: string
  quantity?: number
}>()

const emit = defineEmits<{
  (e: 'increase', id: string): void
  (e: 'decrease', id: string): void
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <div v-if="id && quantity" class="flex items-center gap-2">
    <v-btn variant="flat" icon @click="emit('decrease', id)">
      <MinusSquare :size="20" />
    </v-btn>

    <span>{{ quantity }}</span>

    <v-btn variant="flat" icon @click="emit('increase', id)">
      <PlusSquare :size="20" />
    </v-btn>

    <v-btn variant="flat" icon @click="emit('remove', id)">
      <Trash :size="20" color="red" />
    </v-btn>
  </div>
</template>
