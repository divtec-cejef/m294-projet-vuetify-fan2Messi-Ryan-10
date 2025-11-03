<template>
  <v-card class="team-card ma-2" elevation="4">
    <!-- Image de l'équipe -->
    <v-img
      class="team-img"
      contain
      height="160"
      :src="team.customImage"
    />

    <!-- Nom et pays -->
    <v-card-title class="text-h6 font-weight-bold">
      {{ team.strTeam }}
    </v-card-title>

    <v-card-subtitle class="text-subtitle-2">
      {{ team.strCountry }}
    </v-card-subtitle>

    <!-- Stade -->
    <v-card-text v-if="team.strStadium">
      <strong>Stadium:</strong> {{ team.strStadium }}
    </v-card-text>
  </v-card>
</template>

<script setup>
  defineProps({
    team: Object,
  })
</script>

<style scoped>
.team-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden; /* Empêche les débordements */
}
.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Style pour contenir l'image dans la zone du v-card */
.team-img {
  object-fit: contain;  /* Contient l'image sans la déformer */
  width: 100%;         /* S'étend sur toute la largeur de la carte */
  max-height: 160px;   /* Limite la hauteur */
  background-color: #f5f5f5; /* Fond gris clair si image non remplie */
}
</style>
