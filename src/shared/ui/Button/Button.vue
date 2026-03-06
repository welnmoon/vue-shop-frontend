<template>
  <v-btn :type="type" :disabled="disabled" :class="buttonClass">
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
  },
)

const base =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

const variants: Record<Variant, string> = {
  primary: 'bg-black text-white hover:bg-neutral-800',
  secondary: 'bg-neutral-200 text-black hover:bg-neutral-300',
  outline: 'border border-neutral-300 hover:bg-neutral-100',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
}

const buttonClass = computed(() => [base, variants[props.variant], sizes[props.size]])
</script>
