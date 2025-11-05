<template>
  <div>
    <v-chip class="ma-1" color="blue" text-color="white">
      {{ team.strTeamShort || 'Aucune abréviation' }}
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
