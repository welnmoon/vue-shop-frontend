import type { DeliveryMethods, PaymentMethods } from './types/order-user'

export const deliveryMethods: Record<DeliveryMethods, string> = {
  delivery: 'Доставка',
  pickup: 'Самовывоз',
}

export const paymentMethods: Record<PaymentMethods, string> = {
  cash: 'Наличные',
  card: 'Карта',
}
