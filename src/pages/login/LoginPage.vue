<template>
  <AuthCard title="Логин" subtitle="Войдите в аккаунт что бы сохранить свои заказы.">
    <LoginForm />
  </AuthCard>
</template>

<script lang="ts" setup>
import LoginForm from '@/features/useLogin/ui/LoginForm.vue'
import AuthCard from '@/shared/ui/AuthCard/AuthCard.vue'
</script>
