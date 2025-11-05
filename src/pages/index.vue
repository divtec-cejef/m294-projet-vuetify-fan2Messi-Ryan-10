<template>
  <v-container>
    <!-- Champ de recherche -->
    <v-text-field
      v-model="search"
      clearable
      label="Rechercher une équipe"
      prepend-icon="mdi-magnify"
    />

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
        <TeamCard :team="team" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import TeamCard from '@/components/teamCard.vue'
  import { useTeamsStore } from '@/stores/teamsStore'

  const store = useTeamsStore()
  const search = ref('')

  const teams = computed(() => store.teams)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  const filteredTeams = computed(() => {
    const query = search.value.toLowerCase().trim()
    if (!query) return teams.value
    return teams.value.filter(team =>
      team.strTeam.toLowerCase().includes(query),
    )
  })

  onMounted(() => {
    store.fetchTeams()
  })
</script>
