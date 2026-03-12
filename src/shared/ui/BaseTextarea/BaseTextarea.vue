<script setup lang="ts">
defineOptions({ inheritAttrs: false })
defineProps<{
  label?: string
  modelValue?: string
  validationError?: string
  id?: string
  placeholder?: string
  maxRows?: number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <v-textarea
    :label="label"
    :model-value="modelValue"
    @update:model-value="emits('update:modelValue', $event)"
    :error-messages="validationError"
    :id="id"
    :placeholder="placeholder"
    density="compact"
    v-bind="$attrs"
    :max-rows="maxRows"
  >
  </v-textarea>
</template>
