<template>
  <q-form @submit.prevent="submit">
    <div class="mb-3">
      <BaseInput
        v-model="values.email"
        label="Email"
        type="email"
        placeholder="Email"
        :validation-error="validationErrors.email"
      />
    </div>

    <div class="mb-3">
      <BaseInput
        label="Пароль"
        v-model="values.password"
        type="password"
        placeholder="Пароль"
        :validation-error="validationErrors.password"
      />
    </div>

    <Button variant="outline" :disabled="isPending" type="submit">
      {{ isPending ? 'Регистрация...' : 'Зарегистрироваться' }}
    </Button>

    <p class="mt-3 text-sm">
      Уже есть аккаунт?
      <RouterLink class="text-blue-600 hover:underline" :to="{ name: 'login' }">Войти</RouterLink>
    </p>

    <ErrorText v-if="error">{{ error.message }}</ErrorText>
  </q-form>
</template>

<script lang="ts" setup>
import Button from '@/shared/ui/Button/Button.vue'
import ErrorText from '@/shared/ui/ErrorText/ErrorText.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import { useRegisterForm } from '../api/useRegisterForm'

const { values, validationErrors, error, isPending, submit } = useRegisterForm()
</script>
