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

        <!-- Composant TeamInfo -->
        <TeamInfo class="mt-2" :team="team" />

        <p class="text-subtitle-1 mb-1"><strong>Stade :</strong> {{ team.strStadium }}</p>

        <!-- Description intelligente -->
        <p class="mt-6 text-body-1">
          <strong>Description : </strong>{{ teamDescription }}
        </p>

        <!-- Composant TeamStats -->
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
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import TeamInfo from '@/components/TeamInfo.vue'
  import TeamStats from '@/components/TeamStats.vue'
  import { useTeamsStore } from '@/stores/teamsStore'

  const route = useRoute()
  const store = useTeamsStore()

  // Recherche de l'équipe par id
  const team = store.teams.find(t => t.idTeam == route.params.idTeam)

  // Description dynamique : FR > EN > message par défaut
  const teamDescription = computed(() => {
    if (!team) return 'Aucune équipe trouvée.'
    return (
      team.strDescriptionFR
      || team.strDescriptionEN
      || 'Aucune description disponible pour cette équipe.'
    )
  })
</script>
