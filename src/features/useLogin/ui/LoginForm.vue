<template>
  <q-form @submit.prevent="submit">
    <div class="mb-3">
      <BaseInput
        v-model="values.email"
        type="email"
        label="Email"
        placeholder="Email"
        :validation-error="validationErrors.email"
      />
    </div>

    <div class="mb-3">
      <BaseInput
        v-model="values.password"
        type="password"
        label="Пароль"
        placeholder="Пароль"
        :validation-error="validationErrors.password"
      />
    </div>
    <Button variant="outline" :disabled="isPending" type="submit">
      {{ isPending ? 'Вход...' : 'Войти' }}
    </Button>

    <p class="mt-3 text-sm">
      Нет аккаунта?
      <RouterLink class="text-blue-600 hover:underline" :to="{ name: 'register' }">
        Зарегистрироваться
      </RouterLink>
    </p>

    <ErrorText v-if="error">{{ error.message }}</ErrorText>
  </q-form>
</template>

<script lang="ts" setup>
import Button from '@/shared/ui/Button/Button.vue'
import { useLoginForm } from '../api/useLoginForm'
import ErrorText from '@/shared/ui/ErrorText/ErrorText.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'

const { values, validationErrors, error, isPending, submit } = useLoginForm()
</script>
