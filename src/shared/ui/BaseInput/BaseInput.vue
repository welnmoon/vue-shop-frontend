<template>
  <div class="flex gap-0.5 flex-col">
    <label :for="props.id" v-if="props.label">{{ props.label }}</label>
    <input
      :placeholder="placeholder || label"
      @input="onInput"
      :id="props.id"
      :type="props.type || 'text'"
      :value="props.modelValue"
      :max="max"
      :min="min"
    />
    <p v-if="props.error">{{ props.label }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label?: string
  error?: string
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
