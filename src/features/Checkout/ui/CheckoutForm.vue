<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { checkoutSchema } from '../model/schema'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseTextarea from '@/shared/ui/BaseTextarea/BaseTextarea.vue'
import BaseCheckbox from '@/shared/ui/BaseCheckbox/BaseCheckbox.vue'

const inititalValues = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  postalCode: '',
  comment: '',
  agreeToTerms: false,
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

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <BaseInput
      v-model="fullName"
      v-bind="fullNameAttrs"
      label="Имя"
      :validationError="errors.fullName"
    />
    <BaseInput v-model="email" v-bind="emailAttrs" label="Email" :validationError="errors.email" />
    <BaseInput
      v-model="phone"
      v-bind="phoneAttrs"
      label="Телефон"
      :validationError="errors.phone"
    />

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
    <BaseCheckbox v-model="agreeToTerms" v-bind="agreeToTermsAttrs" :error="errors.agreeToTerms">
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
  </form>
</template>
