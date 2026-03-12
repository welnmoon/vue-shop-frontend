import * as z from 'zod'

export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Введите имя'),
  email: z.string().email('Некорректный email'),
  phone: z.string().min(1, 'Введите телефон'),
  city: z.string().min(1, 'Введите город'),
  street: z.string().min(1, 'Введите улицу'),
  postalCode: z.string().min(1, 'Введите индекс'),
  comment: z.string().optional(),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: 'Нужно согласиться с условиями',
  }),
})
