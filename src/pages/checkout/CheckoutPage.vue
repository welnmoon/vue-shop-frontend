<template>
  <section v-if="showForm" class="flex flex-col">
    <BaseText level="h2" text="Checkout" />
    <section class="flex flex-col gap-4 md:flex-row md:items-start">
      <div class="flex-1">
        <div class="flex flex-col gap-4">
          <div class="" v-for="item in items" :key="item.productId">
            <CartItem
              @remove="removeItem"
              @decrease="decreaseItem"
              @increase="increaseItem"
              variant="elevated"
              :cart-item="item"
            />
          </div>
        </div>
      </div>
      <div class="md:w-[420px] md:sticky md:top-6">
        <CheckoutForm :items="items" />
      </div>
    </section>
  </section>

  <section v-else>
    <InfoBlock
      action-to="/"
      action-text="На Главную"
      title="Корзина пуста"
      text="Добавьте товары в корзину"
    />
  </section>
</template>

<script setup lang="ts">
import CheckoutForm from '@/features/CreateOrder/ui/CheckoutForm.vue'
import { useCart } from '@/shared/composables/useCart'
import BaseText from '@/shared/ui/BaseHeading/BaseText.vue'
import CartItem from '@/shared/ui/CartItem/CartItem.vue'
import InfoBlock from '@/shared/ui/InfoBlock/InfoBlock.vue'
import { computed } from 'vue'

const { items, decreaseItem, increaseItem, removeItem } = useCart()
const showForm = computed(() => items.value.length > 0)
</script>
