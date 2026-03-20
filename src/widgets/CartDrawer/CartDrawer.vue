<template>
  <q-dialog
    :model-value="modelValue"
    position="right"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="column no-wrap full-height cart-drawer">
      <div class="p-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Корзина</h2>
        <q-btn flat round dense icon="close" @click="closeDrawer" />
      </div>

      <template v-if="items.length > 0">
        <div class="col overflow-auto">
          <div v-if="isLoading" class="grid grid-cols-1 gap-4 p-4">
            <div v-for="i in 8" :key="i" class="w-full h-full rounded-lg border p-4 shadow-sm">
              <div class="flex gap-2">
                <q-skeleton class="w-1/3 rounded" height="160px" />

                <div class="flex flex-col gap-2 flex-1">
                  <q-skeleton type="text" />
                  <q-skeleton type="text" />
                  <q-skeleton type="text" width="75%" />
                </div>
              </div>

              <div class="flex items-center justify-between gap-3 mt-4">
                <q-skeleton type="text" width="100px" />
                <q-skeleton type="rect" width="100px" height="36px" />
              </div>
            </div>
          </div>

          <template v-else>
            <InfoBlock
              v-if="!isAuthenticated"
              :can-dismiss="true"
              text="Войдите в аккаунт чтобы сохранить свою корзину"
              action-text="Перейти к логину"
              action-to="/login"
            />

            <div class="flex flex-col gap-4 p-4">
              <div v-for="p in items" :key="p.productId">
                <CartItem
                  :cart-item="p"
                  variant="elevated"
                  @remove="removeItem"
                  @decrease="decreaseItem"
                  @increase="increaseItem"
                />
              </div>
            </div>
          </template>
        </div>

        <div class="p-4 h-fit shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
          <div><span class="font-bold">Итоговая сумма: </span>{{ totalPrice }}</div>
          <div><span class="font-bold">Итого товаров: </span>{{ totalCount }}</div>

          <RouterLink to="/checkout">
            <Button variant="primary">Оформить заказ</Button>
          </RouterLink>
        </div>
      </template>

      <InfoBlock v-else title="Корзина пуста" text="Добавьте товары в корзину" />
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { lockScroll, unlockScroll } from '@/app/stores/ui'
import { useCart } from '@/shared/composables/useCart'
import Button from '@/shared/ui/Button/Button.vue'
import CartItem from '@/shared/ui/CartItem/CartItem.vue'
import InfoBlock from '@/shared/ui/InfoBlock/InfoBlock.vue'
import { defineComponent, onBeforeUnmount, watch } from 'vue'

export default defineComponent({
  name: 'CartDrawer',
  components: {
    Button,
    CartItem,
    InfoBlock,
  },
  setup(props, { emit }) {
    const {
      items,
      totalCount,
      totalPrice,
      decreaseItem,
      increaseItem,
      removeItem,
      isLoading,
      isAuthenticated,
    } = useCart()

    // drawer - UI
    const closeDrawer = () => {
      emit('update:modelValue', false)
    }

    watch(
      () => props.modelValue,
      (isOpen) => {
        if (isOpen) {
          lockScroll()
        } else {
          unlockScroll()
        }
      },
      { immediate: true },
    )

    onBeforeUnmount(() => {
      unlockScroll()
    })

    return {
      closeDrawer,
      items,
      totalCount,
      totalPrice,
      decreaseItem,
      increaseItem,
      removeItem,
      isLoading,
      isAuthenticated,
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    'update:modelValue': (value: boolean) => typeof value === 'boolean',
  },
})
</script>
