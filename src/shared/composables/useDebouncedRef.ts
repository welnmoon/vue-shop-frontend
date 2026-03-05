import { onUnmounted, ref, watch, type Ref } from 'vue'

export const useDebouncedRef = <T>(source: Ref<T>, delay = 300) => {
  const debounced = ref(source.value) as Ref<T> // то есть мы создаем копию состояния которую передали снаружи

  let timer: ReturnType<typeof setTimeout> | null = null

  watch(
    source,
    (v) => {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        debounced.value = v
      }, delay)
    },

    { flush: 'sync' }, // Что это
  )

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return debounced
}
