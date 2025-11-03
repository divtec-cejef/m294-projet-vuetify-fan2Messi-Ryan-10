<template>
  <v-container>
    <!-- Champ de recherche -->
    <v-text-field
      v-model="search"
      clearable
      label="Rechercher une équipe"
      prepend-icon="mdi-magnify"
    />

    <!-- Message d’erreur -->
    <!--<v-alert v-if="error" class="mt-3" type="error">{{ error }}</v-alert>-->

    <!-- Message si aucune équipe ne correspond -->
    <v-alert
      v-if="!loading && filteredTeams.length === 0 && search.trim() !== ''"
      class="text-center mt-4"
      type="warning"
    >
      Aucune équipe ne correspond à votre recherche.
    </v-alert>

    <!-- Grille des équipes -->
    <v-row v-if="filteredTeams.length > 0" class="mt-4">
      <v-col
        v-for="team in filteredTeams"
        :key="team.idTeam"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card>
          <v-img height="150" :src="team.strTeamBadge" />
          <v-card-title>{{ team.strTeam }}</v-card-title>
          <v-card-subtitle>{{ team.strCountry }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useTeamsStore } from '@/stores/teamsStore'

  // Store Pinia
  const store = useTeamsStore()

  // Champs de recherche
  const search = ref('')

  // Accès aux états du store
  const teams = computed(() => store.teams)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  // Filtrage dynamique des équipes
  const filteredTeams = computed(() => {
    const query = search.value.toLowerCase().trim()
    if (!query) return teams.value
    return teams.value.filter(team =>
      team.strTeam.toLowerCase().includes(query),
    )
  })

  // Récupère les équipes au chargement
  onMounted(() => {
    store.fetchTeams()
  })
</script>
