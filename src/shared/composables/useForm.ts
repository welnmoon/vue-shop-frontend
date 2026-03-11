import { reactive } from 'vue'
import { ZodType } from 'zod'

type UseFormOptions<T> = {
  schema: ZodType<T>
  initialValues: T
  onSubmit: (values: T) => Promise<void> | void
}
type FormErrors<T extends object> = Partial<Record<keyof T, string>>

export const useForm = <T extends object>({
  initialValues,
  onSubmit,
  schema,
}: UseFormOptions<T>) => {
  const values = reactive({
    ...initialValues,
  }) as T

  const validationErrors: FormErrors<T> = reactive({})
  function clearErrors() {
    for (const key of Object.keys(validationErrors) as Array<keyof T>) {
      delete validationErrors[key]
    }
  }

  const validate = () => {
    clearErrors()

    const res = schema.safeParse(values)

    if (res.success) return true

    for (const issue of res.error.issues) {
      const field = issue.path[0]

      if (typeof field === 'string') {
        validationErrors[field as keyof T] = issue.message
      }
    }

    return false
  }

  async function submit() {
    const isValid = validate()

    if (!isValid) return

    await onSubmit(values)
  }

  function reset() {
    for (const key of Object.keys(initialValues) as Array<keyof T>) {
      values[key] = initialValues[key]
    }

    clearErrors()
  }

  return {
    values,
    validationErrors,
    submit,
    reset,
  }
}
