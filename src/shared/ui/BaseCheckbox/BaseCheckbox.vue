<template>
  <div v-bind="$attrs">
    <input type="checkbox" :checked="props.modelValue" @change="onChange" class="mr-1" />
    <slot />
    <error-text v-if="props.error" :text="props.error" />
  </div>
</template>

<script setup lang="ts">
import ErrorText from '../ErrorText/ErrorText.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onChange = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked

  emit('update:modelValue', checked)
}
</script>
