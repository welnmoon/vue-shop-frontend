<template>
  <div class="mb-3">
    <q-input
      :model-value="modelValue"
      @update:model-value="onUpdate"
      :label="label"
      :type="type"
      outlined
      dense
      hide-bottom-space
      :min="min"
      :max="max"
      :id="id"
      :placeholder="placeholder"
      v-bind="$attrs"
    />
    <ErrorText v-if="validationError">{{ validationError }}</ErrorText>
  </div>
</template>

<script setup lang="ts">
import ErrorText from '../ErrorText/ErrorText.vue'
defineOptions({ inheritAttrs: false })

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'search'
  | 'textarea'
  | 'time'
  | 'date'
  | 'tel'
  | 'url'
  | 'datetime-local'
  | 'file'

const props = defineProps<{
  modelValue?: string | number | null
  label?: string
  validationError?: string
  type?: InputType
  id?: string
  placeholder?: string
  max?: string | number
  min?: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const onUpdate = (value: string | number | null) => {
  emit('update:modelValue', value)
}
</script>
