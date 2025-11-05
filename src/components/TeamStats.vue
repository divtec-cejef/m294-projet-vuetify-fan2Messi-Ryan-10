<template>
  <div class="team-stats">
    <v-list-item v-for="(value, key) in stats" :key="key">
      <v-list-item-title>{{ key.toUpperCase() }} : {{ value }}</v-list-item-title>
      <v-progress-linear
        color="blue"
        height="20"
        :model-value="value"
      />
    </v-list-item>
  </div>
</template>

<script setup>
  defineProps({
    stats: {
      type: Object,
      required: true,
    },
  })
</script>

<style scoped>
.team-stats {
  margin-top: 1rem;
}
.v-list-item {
  margin-bottom: 1rem;
}
</style>
