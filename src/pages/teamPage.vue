<template>
  <v-container>
    <v-btn class="mb-4" to="/">← Retour à la liste</v-btn>

    <v-skeleton-loader
      v-if="loading"
      type="image, heading, paragraph"
    />

    <div v-else-if="team">
      <v-card>
        <v-img contain height="200" :src="team.strLogo" />
        <v-card-title class="text-h5">{{ team.strTeam }}</v-card-title>
        <v-card-subtitle>{{ team.strCountry }}</v-card-subtitle>
        <v-card-text>
          <p><strong>Stadium:</strong> {{ team.strStadium }}</p>
          <p><strong>Formed Year:</strong> {{ team.intFormedYear }}</p>
          <p><strong>Manager:</strong> {{ team.strManager }}</p>
          <p><strong>Description:</strong> {{ team.strDescriptionEN }}</p>
        </v-card-text>
      </v-card>
    </div>

    <v-alert v-else type="error">Équipe non trouvée.</v-alert>
  </v-container>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/plugins/axios'

  const route = useRoute()
  const team = ref(null)
  const loading = ref(true)

  onMounted(async () => {
    const idTeam = route.params.idTeam
    try {
      const response = await api.get(`lookupteam.php?id=${idTeam}`)
      team.value = response.data.teams[0]
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
