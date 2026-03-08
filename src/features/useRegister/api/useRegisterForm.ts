import { useRegister } from '@/features/useRegister/api/useRegister'
import { useForm } from '@/shared/composables/useLogin'
import z from 'zod'

const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
}

export const useRegisterForm = () => {
  const { mutate: register, isPending, isError, error } = useRegister()
  const { values, validationErrors, submit, reset } = useForm<RegisterFormValues>({
    initialValues,
    schema: registerSchema,
    onSubmit: register,
  })

  return {
    values,
    validationErrors,
    isPending,
    isError,
    error,
    submit,
    reset,
  }
}
