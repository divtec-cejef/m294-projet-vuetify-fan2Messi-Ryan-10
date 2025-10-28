<template>
  <!-- Barre d'application plate -->
  <v-app-bar color="primary" dark flat>
    <v-container class="d-flex align-center">
      <!-- Logo cliquable -->
      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/logopl.png"
        size="48"
        @click="$router.push('/')"
      />

      <!-- Titre -->
      <v-toolbar-title class="text-h6 font-weight-bold">
        Premier League
      </v-toolbar-title>

      <!-- Espace entre le titre et les boutons -->
      <v-spacer />

      <!-- Boutons du menu -->
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
        variant="text"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
// Modifier les icons car c'est ceux de pokemon
  const menuItems = [
    { title: 'Accueil', path: '/', icon: 'mdi-home' },
    { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
    { title: 'FAQ', path: '/faq', icon: 'mdi-help-circle' },
  ]
</script>
