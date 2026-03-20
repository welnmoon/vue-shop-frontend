<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })
const props = defineProps<{
  label?: string
  modelValue?: string | null
  validationError?: string
  id?: string
  placeholder?: string
  maxRows?: number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const inputStyle = computed(() =>
  props.maxRows ? { maxHeight: `${props.maxRows * 24}px`, overflowY: 'auto' } : undefined,
)
</script>

<template>
  <q-input
    type="textarea"
    :label="label"
    :model-value="modelValue"
    @update:model-value="emits('update:modelValue', ($event as string | null) ?? '')"
    :error="!!validationError"
    :error-message="validationError"
    :id="id"
    :placeholder="placeholder"
    :input-style="inputStyle"
    outlined
    dense
    autogrow
    hide-bottom-space
    v-bind="$attrs"
  />
</template>
