import { deliveryMethods, paymentMethods } from '@/entities/order/model/types/order-user'
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
  deliveryMethod: z.enum(deliveryMethods),
  paymentMethod: z.enum(paymentMethods),
})

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, 'Минимум 1 товар'),
})

export const createOrderSchema = checkoutSchema.extend({
  items: z.array(cartItemSchema).min(1, 'Добавьте хотя бы один товар'),
})

export type CreateOrder = z.infer<typeof createOrderSchema>
