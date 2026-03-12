<template>
  <div class="mb-3">
    <v-text-field
      :model-value="modelValue"
      @update:model-value="onUpdate"
      :label="label"
      :type="type"
      variant="outlined"
      hide-details
      :min="min"
      :max="max"
      :id="id"
      :placeholder="placeholder"
      density="compact"
      v-bind="$attrs"
    />
    <ErrorText v-if="validationError">{{ validationError }}</ErrorText>
  </div>
</template>

<script setup lang="ts">
import ErrorText from '../ErrorText/ErrorText.vue'
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: string
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

const onUpdate = (value: string) => {
  emit('update:modelValue', value)
}
</script>
