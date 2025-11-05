<template>
  <div>
    <v-chip class="ma-1" color="blue" text-color="white">
      {{ team.strCountry || 'Pays inconnu' }}
    </v-chip>

    <v-chip class="ma-1" color="green" text-color="white">
      {{ team.strLeague || 'Ligue inconnue' }}
    </v-chip>

    <v-chip class="ma-1" color="deep-purple" text-color="white">
      {{ team.intFormedYear ? `Fondée en ${team.intFormedYear}` : 'Année inconnue' }}
    </v-chip>
  </div>
</template>

<script setup>
  defineProps({
    team: {
      type: Object,
      required: true,
    },
  })
</script>
