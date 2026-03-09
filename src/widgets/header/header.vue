<script setup lang="ts">
import { useCartStore } from '@/app/stores/cart'
import { useUIStore } from '@/app/stores/ui'
import { useGetCart } from '@/entities/cart/api/useGetCart'
import { getCartItemsQuantity } from '@/shared/helpers/getCartItemsQuantity'
import CartDrawer from '@/shared/ui/CartDrawer/CartDrawer.vue'
import { computed } from 'vue'

// const cartStore = useCartStore()

// const { itemsCount } = storeToRefs(cartStore)
const { data: cartFromServer, isLoading } = useGetCart()
const quantity = computed(() => getCartItemsQuantity(cartFromServer.value))

const UIStore = useUIStore()
</script>

<template>
  <header class="w-full border-b bg-white">
    <div class="w-full px-4">
      <div class="max-w-7xl mx-auto flex items-center h-16 gap-6 md:gap-10 lg:gap-16">
        <h1 class="text-xl font-semibold shrink-0">Vue Shop</h1>

        <nav class="flex gap-4 md:gap-6 text-gray-700">
          <RouterLink to="/" class="hover:text-black">Home</RouterLink>
          <RouterLink to="/about" class="hover:text-black">About</RouterLink>
          <RouterLink to="/" class="hover:text-black">Contact</RouterLink>
        </nav>

        <div class="flex items-center gap-3 md:gap-4 ml-auto">
          <RouterLink to="/login"><i class="pi pi-user cursor-pointer"></i></RouterLink>
          <i @click="UIStore.toggleCartDrawer" class="pi pi-shopping-cart cursor-pointer relative"
            ><div
              class="absolute top-0 w-4 h-4 text-xs -right-2 -translate-y-1/2 bg-red-600 text-white rounded-full flex items-center justify-center"
            >
              {{ isLoading ? 0 : quantity }}
            </div></i
          >
        </div>
      </div>
    </div>
  </header>

  <CartDrawer v-model="UIStore.isCartDrawerOpen" />
</template>

<style lang="scss" scoped></style>
