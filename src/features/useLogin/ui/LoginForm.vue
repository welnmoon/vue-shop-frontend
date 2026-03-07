<template>
  <form class="flex flex-col gap-2 items-center" @submit.prevent="submit">
    <h3 class="sr-only">Форма логина</h3>

    <input v-model="values.email" type="email" />
    <span v-if="validationErrors.email">{{ validationErrors.email }}</span>

    <input v-model="values.password" type="password" />
    <span v-if="validationErrors.password">{{ validationErrors.password }}</span>

    <Button variant="outline" :disabled="isPending" type="submit">
      {{ isPending ? 'Вход...' : 'Войти' }}
    </Button>

    <span v-if="error">{{ error }}</span>
  </form>
</template>

<script lang="ts" setup>
import Button from '@/shared/ui/Button/Button.vue'
import { useLoginForm } from '../api/useLoginForm'

const { values, validationErrors, error, isPending, submit } = useLoginForm()
</script>
