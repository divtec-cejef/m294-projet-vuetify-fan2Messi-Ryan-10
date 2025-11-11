<template>
  <v-container>
    <h1 class="mb-6 text-center">Mes équipes favorites</h1>

    <!-- Grille des favoris -->
    <v-row v-if="favorites.length > 0">
      <v-col
        v-for="team in favorites"
        :key="team.idTeam"
        cols="12"
        md="4"
        sm="6"
      >
        <TeamCard :team="team" />
      </v-col>
    </v-row>

    <!-- Message si aucun favori -->
    <v-alert
      v-else
      class="text-center mt-4"
      type="info"
    >
      Vous n'avez pas encore d'équipe favorite.<br>
      <v-btn color="primary" to="/">Retourner à la liste</v-btn>
    </v-alert>
  </v-container>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useTeamsStore } from '@/stores/teamsStore'

  const store = useTeamsStore()

  // Charger les favoris depuis le localStorage au montage
  onMounted(() => {
    store.loadFavorites()
  })

  // Computed pour récupérer les favoris
  const favorites = computed(() => store.favorites)
</script>
