<template>
  <v-container>
    <v-text-field
      v-model="teamName"
      label="Rechercher une équipe"
      @keyup.enter="searchTeam"
    />
    <v-btn :loading="loading" @click="searchTeam">Rechercher</v-btn>

    <v-alert v-if="error" class="mt-3" type="error">{{ error }}</v-alert>

    <v-row v-if="teams.length > 0" class="mt-4">
      <v-col
        v-for="team in teams"
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

  const store = useTeamsStore()
  const teamName = ref('Arsenal')

  const teams = computed(() => store.teams)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)

  async function searchTeam () {
    await store.fetchTeams(teamName.value)
  }

  onMounted(() => {
    searchTeam()
  })
</script>
