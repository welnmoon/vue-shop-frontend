<template>
  <AuthCard title="Зарегестрироваться" subtitle="Создайте аккаунт что бы сохранять свои заказы.">
    <RegisterForm
  /></AuthCard>
</template>

<script lang="ts" setup>
import RegisterForm from '@/features/useRegister/ui/RegisterForm.vue'
import AuthCard from '@/shared/ui/AuthCard/AuthCard.vue'
</script>
