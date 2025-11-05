<template>
  <v-container v-if="team">
    <v-row class="align-start">
      <!-- Image -->
      <v-col cols="12" md="4">
        <v-img
          :alt="team.strTeam"
          class="rounded"
          contain
          height="200"
          :src="team.customImage || team.strBadge"
        />
      </v-col>

      <!-- Infos principales -->
      <v-col cols="12" md="8">
        <!-- Nom de l’équipe -->
        <h1 class="text-h4 mb-2">{{ team.strTeam }}</h1>

        <!-- 🔹 Composant TeamInfo (pays, ligue, année, etc.) -->
        <TeamInfo class="mt-2" :team="team" />

        <p class="text-subtitle-1 mb-1"><strong>Stade :</strong> {{ team.strStadium }}</p>

        <!-- Description -->
        <p class="mt-6 text-body-1">{{ team.strDescriptionEN }}</p>

        <!-- 🔹 Composant TeamStats (victoires, défaites, etc.) -->
        <TeamStats v-if="team.stats" class="mt-6" :stats="team.stats" />

        <!-- Bouton retour -->
        <v-btn
          class="mt-8"
          color="primary"
          prepend-icon="mdi-arrow-left"
          to="/"
          variant="tonal"
        >
          Retour
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- Si aucune équipe trouvée -->
  <v-container v-else>
    <v-alert class="text-center" type="error">
      Équipe introuvable.
    </v-alert>
  </v-container>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import TeamInfo from '@/components/TeamInfo.vue'
  import TeamStats from '@/components/TeamStats.vue' // ✅ Ajout du composant stats
  import { useTeamsStore } from '@/stores/teamsStore'

  const route = useRoute()
  const store = useTeamsStore()

  // Recherche de l'équipe par id
  const team = store.teams.find(t => t.idTeam == route.params.idTeam)
</script>
