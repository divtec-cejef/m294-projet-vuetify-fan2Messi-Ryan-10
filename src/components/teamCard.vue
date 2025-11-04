<template>
  <v-card class="team-card ma-2" elevation="4">
    <!-- Bouton de favoris -->
    <v-btn
      class="position-absolute bottom-0 right-0 mb-2 mr-2"
      icon
      variant="plain"
      @click.stop="store.toggleFavorite(team)"
    >
      <v-icon :color="store.isFavorite(team) ? 'red' : ''">
        {{ store.isFavorite(team) ? 'mdi-heart' : 'mdi-heart-outline' }}
      </v-icon>
    </v-btn>

    <!-- Image -->
    <v-img class="team-img" contain height="160" :src="team.customImage" />

    <!-- Nom et pays -->
    <v-card-title class="text-h6 font-weight-bold">{{ team.strTeam }}</v-card-title>
    <v-card-subtitle>{{ team.strCountry }}</v-card-subtitle>

    <!-- Stade -->
    <v-card-text v-if="team.strStadium">
      <strong>Stadium:</strong> {{ team.strStadium }}
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { useTeamsStore } from '@/stores/teamsStore'
  const store = useTeamsStore()

  defineProps({
    team: Object,
  })
</script>

<style scoped>
.team-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}
.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
.team-img {
  object-fit: contain;
  background-color: #f5f5f5;
}
</style>
