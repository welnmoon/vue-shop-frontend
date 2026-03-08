<template>
  <h1>Profile</h1>
  <button @click="handleLogout" :disabled="isPending">
    {{ isPending ? 'Выходим...' : 'Выйти' }}
  </button>
  <pre v-if="!isLoading">{{ currentUser }}</pre>
  <pre v-if="!currentUser?.id">Unauthorized</pre>
  <p v-if="isError">Ошибка: {{ error }}</p>
</template>

<script lang="ts" setup>
import { useGetCurrentUser } from '@/entities/user/api/useGetCurrentUser'
import { useLogout } from '@/entities/user/api/useLogout'

const { data: currentUser, isLoading } = useGetCurrentUser()
const { mutate: submitLogout, isPending, isError, error } = useLogout()

const handleLogout = () => {
  submitLogout()
}
</script>
