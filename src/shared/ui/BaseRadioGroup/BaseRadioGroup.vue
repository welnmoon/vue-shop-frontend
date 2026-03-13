<template>
  <div class="flex gap-4">
    <label class="space-x-2" v-for="option in options" :key="option.value">
      <div
        class="p-4 flex gap-2 items-center shadow-md border border-neutral-300 rounded-md"
        :class="modelValue === option.value ? 'border-red-600' : ''"
      >
        <input
          :name="name"
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="onChange(option.value)"
          class="p-4"
        /><span>{{ option.label }}</span>
      </div>
    </label>
  </div>
  <ErrorText v-if="validationError" :text="validationError" />
</template>

<script setup lang="ts">
import ErrorText from '../ErrorText/ErrorText.vue'

defineOptions({ inheritAttrs: false })

type Option = {
  label: string
  value: string
}

defineProps<{
  modelValue?: string
  options: Option[]
  name: string
  validationError?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onChange = (v: string) => {
  emit('update:modelValue', v)
}
</script>
