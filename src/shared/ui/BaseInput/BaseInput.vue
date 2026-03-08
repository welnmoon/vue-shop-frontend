<template>
  <div class="mb-3">
    <v-text-field
      @input="onInput"
      :v-model="modelValue"
      :label="label"
      :type="type"
      variant="outlined"
      hide-details
    />
    <ErrorText v-if="validationError">{{ validationError }}</ErrorText>
  </div>
</template>

<script setup lang="ts">
import ErrorText from '../ErrorText/ErrorText.vue'

const props = defineProps<{
  modelValue: string
  label?: string
  validationError?: string
  type?: string
  id?: string
  placeholder?: string
  max?: string
  min?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  console.log('onInput: ', value)
  emit('update:modelValue', value)
}
</script>
