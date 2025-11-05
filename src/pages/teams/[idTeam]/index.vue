<template>
  <v-container v-if="team">
    <v-row class="align-start">
      <!-- Image -->
      <v-col cols="12" md="4">
        <v-img
          :src="team.customImage || team.strBadge"
          :alt="team.strTeam"
          height="200"
          class="rounded"
          contain
        />
      </v-col>

      <!-- Infos principales -->
      <v-col cols="12" md="8">
        <h1 class="text-h4 mb-2">{{ team.strTeam }}</h1>
        <p class="text-subtitle-1 mb-1"><strong>Pays :</strong> {{ team.strCountry }}</p>
        <p class="text-subtitle-1 mb-1"><strong>Stade :</strong> {{ team.strStadium }}</p>
        <p class="text-subtitle-1 mb-1"><strong>Année de création :</strong> {{ team.intFormedYear }}</p>

        <!-- Description -->
        <p class="mt-6 text-body-1">{{ team.strDescriptionEN }}</p>

        <!-- Bouton retour -->
        <v-btn
          to="/"
          prepend-icon="mdi-arrow-left"
          class="mt-8"
          color="primary"
          variant="tonal"
        >
          Retour
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- Si aucune équipe trouvée -->
  <v-container v-else>
    <v-alert type="error" class="text-center">
      Équipe introuvable.
    </v-alert>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useTeamsStore } from '@/stores/teamsStore'

const route = useRoute()
const store = useTeamsStore()

// Recherche de l'équipe par id
const team = store.teams.find(t => t.idTeam == route.params.idTeam)
</script>
