<template>
  <v-app>
    <!-- Barre de navigation -->
    <AppHeader />

    <!-- Contenu des pages -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import AppHeader from '@/components/AppHeader.vue'
</script>
