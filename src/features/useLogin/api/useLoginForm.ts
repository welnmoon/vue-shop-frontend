import { useLogin } from '@/features/useLogin/api/useLogin'
import { useForm } from '@/shared/composables/useLogin'
import z from 'zod'

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const initialValues: LoginFormValues = {
  email: '',
  password: '',
}
export const useLoginForm = () => {
  const { mutate: login, isPending, isError, error } = useLogin()
  const { values, validationErrors, submit, reset } = useForm<LoginFormValues>({
    initialValues,
    schema: loginSchema,
    onSubmit: login,
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
