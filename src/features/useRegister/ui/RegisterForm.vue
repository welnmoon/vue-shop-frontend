<template>
  <v-form @submit.prevent="submit">
    <div class="mb-3">
      <v-text-field
        v-model="values.email"
        label="Email"
        type="email"
        variant="outlined"
        hide-details
      />
      <ErrorText v-if="validationErrors.email">{{ validationErrors.email }}</ErrorText>
    </div>

    <div class="mb-3">
      <v-text-field
        label="Пароль"
        v-model="values.password"
        type="password"
        variant="outlined"
        hide-details
      />
      <ErrorText v-if="validationErrors.password">{{ validationErrors.password }}</ErrorText>
    </div>

    <Button variant="outline" :disabled="isPending" type="submit">
      {{ isPending ? 'Регистрация...' : 'Зарегистрироваться' }}
    </Button>

    <ErrorText v-if="error">{{ error }}</ErrorText>
  </v-form>
</template>

<script lang="ts" setup>
import Button from '@/shared/ui/Button/Button.vue'
import ErrorText from '@/shared/ui/ErrorText/ErrorText.vue'
import { useRegisterForm } from '../api/useRegisterForm'

const { values, validationErrors, error, isPending, submit } = useRegisterForm()
</script>
