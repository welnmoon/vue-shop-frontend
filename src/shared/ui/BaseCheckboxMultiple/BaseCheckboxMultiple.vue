<template>
  <input
    type="checkbox"
    :value="props.value"
    :checked="props.modelValue.includes(props.value)"
    @change="onChange"
    class="mr-1"
  />
  <slot />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  value: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const onChange = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked

  const next = checked
    ? [...props.modelValue, props.value]
    : props.modelValue.filter((x) => x !== props.value)

  emit('update:modelValue', next)
}
</script>
