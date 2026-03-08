<template>
  <v-container class="fill-height auth-page" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-2" rounded="xl" elevation="10">
          <v-card-item class="pb-2">
            <v-card-title class="text-h5 font-weight-bold">
              {{ title }}
            </v-card-title>

            <v-card-subtitle v-if="subtitle" class="pt-1">
              {{ subtitle }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <slot />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
}
</style>
