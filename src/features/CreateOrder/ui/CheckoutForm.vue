<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { checkoutSchema } from '../model/schema'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseTextarea from '@/shared/ui/BaseTextarea/BaseTextarea.vue'
import BaseCheckbox from '@/shared/ui/BaseCheckbox/BaseCheckbox.vue'
import BaseCard from '@/shared/ui/BaseCard/BaseCard.vue'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'
import Button from '@/shared/ui/Button/Button.vue'
import { useCreateOrder } from '../api/useCreateOrder'
import { useCart } from '@/shared/composables/useCart'
import { computed, type ComputedRef } from 'vue'
import BaseRadioGroup from '@/shared/ui/BaseRadioGroup/BaseRadioGroup.vue'
import { deliveryMethods, paymentMethods } from '@/entities/order/model/const'
import type { DeliveryMethods, PaymentMethods } from '@/entities/order/model/types/order-user'
import type { CartLine } from '@/entities/cart/model/types'

const { mutate: createOrder, isPending: orderIsCreating } = useCreateOrder()

const props = defineProps<{
  items: CartLine[]
}>()

const orderItemsMap = computed(() => {
  return props.items.map((i) => ({
    productId: i.productId,
    quantity: i.quantity,
  }))
})

const inititalValues = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  postalCode: '',
  comment: '',
  agreeToTerms: false,
  deliveryMethod: 'pickup' as DeliveryMethods,
  paymentMethod: 'card' as PaymentMethods,
}

const { handleSubmit, errors, defineField, isSubmitting } = useForm({
  validationSchema: toTypedSchema(checkoutSchema),
  initialValues: inititalValues,
})

const [fullName, fullNameAttrs] = defineField('fullName')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [city, cityAttrs] = defineField('city')
const [street, streetAttrs] = defineField('street')
const [postalCode, postalCodeAttrs] = defineField('postalCode')
const [comment, commentAttrs] = defineField('comment')
const [agreeToTerms, agreeToTermsAttrs] = defineField('agreeToTerms')
const [deliveryMethod, deliveryMethodAttrs] = defineField('deliveryMethod')
const [paymentMethod, paymentMethodAttrs] = defineField('paymentMethod')

const onSubmit = handleSubmit(async (values) => {
  createOrder(
    { ...values, items: orderItemsMap.value },
    {
      onSuccess: () => {
        alert('Заказ успешно создан')
      },
    },
  )
})
</script>

<template>
  <BaseCard>
    <form class="flex flex-col gap-4 items-start" @submit.prevent="onSubmit">
      <div>
        <BaseText text="Личные данные" level="h3" />
        <BaseInput
          v-model="fullName"
          v-bind="fullNameAttrs"
          label="Имя"
          :validationError="errors.fullName"
        />
        <BaseInput
          v-model="email"
          v-bind="emailAttrs"
          label="Email"
          :validationError="errors.email"
        />
        <BaseText text="Контакты" level="h3" />
        <BaseInput
          v-model="phone"
          v-bind="phoneAttrs"
          label="Телефон"
          :validationError="errors.phone"
        />
        <BaseText text="Адрес" level="h3" />
        <BaseInput v-model="city" v-bind="cityAttrs" label="Город" :validationError="errors.city" />
        <BaseInput
          v-model="street"
          v-bind="streetAttrs"
          label="Улица"
          :validationError="errors.street"
        />
        <BaseInput
          v-model="postalCode"
          v-bind="postalCodeAttrs"
          label="Индекс"
          :validationError="errors.postalCode"
        />
        <BaseTextarea
          v-model="comment"
          v-bind="commentAttrs"
          label="Комментарий"
          :validationError="errors.comment"
          :maxRows="4"
        />

        <BaseText text="Доставка" level="h3" />

        <BaseRadioGroup
          v-model="deliveryMethod"
          :options="
            Object.entries(deliveryMethods).map(([k, v]) => ({
              value: k as DeliveryMethods,
              label: v,
            }))
          "
          v-bind="deliveryMethodAttrs"
          :validationError="errors.deliveryMethod"
          name="deliveryMethod"
        />

        <BaseText text="Оплата" level="h3" />

        <BaseRadioGroup
          v-model="paymentMethod"
          :options="
            Object.entries(paymentMethods).map(([k, v]) => ({
              value: k as PaymentMethods,
              label: v,
            }))
          "
          v-bind="paymentMethodAttrs"
          :validationError="errors.paymentMethod"
          name="paymentMethod"
        />

        <BaseCheckbox
          class="mt-6"
          v-model="agreeToTerms"
          v-bind="agreeToTermsAttrs"
          :error="errors.agreeToTerms"
        >
          Соглашаюсь с
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline hover:text-primary-dark"
          >
            условиями использования
          </a>
          и
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary underline hover:text-primary-dark"
          >
            политикой конфиденциальности
          </a>
        </BaseCheckbox>
      </div>
      <Button :disabled="isSubmitting || orderIsCreating" type="submit">{{
        orderIsCreating ? 'Создание заказа...' : 'Создать заказ'
      }}</Button>
      <!-- {{ JSON.stringify(values) }} -->
    </form>
  </BaseCard>
</template>
