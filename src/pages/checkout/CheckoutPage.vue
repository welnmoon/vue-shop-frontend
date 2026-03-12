<template>
  <section>
    <BaseText level="h2" text="Checkout" />
    <div v-for="item in items" :key="item.productId">
      <BaseCard>
        <template #header
          ><div>{{ item.title }}</div></template
        >

        <div>{{ item.price }}</div>

        <template #footer>
          <div id="footer">{{ item.quantity }}</div></template
        >
      </BaseCard>
    </div>
    <CheckoutForm />
  </section>
</template>

<script setup lang="ts">
import CheckoutForm from '@/features/Checkout/ui/CheckoutForm.vue'
import { useCart } from '@/shared/composables/useCart'
import BaseCard from '@/shared/ui/BaseCard/BaseCard.vue'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'

const { items } = useCart()
</script>

<!-- Обязательно

контактная форма

адрес

доставка

оплата (выбор метода)

summary

submit

клиентская валидация

серверные ошибки

loading state

disabled state

success/error feedback

Хорошо добавить

промокод

“billing same as shipping”

автозаполнение из профиля

сохранение черновика в store/localStorage

шаги checkout

обработка ошибок по полям от сервера

Уже очень хорошо

schema-driven validation

типизация API-ответов

разделение UI/business logic

unit tests хотя бы на composables/validation

e2e сценарий “успешный заказ / ошибка / невалидные поля” -->
