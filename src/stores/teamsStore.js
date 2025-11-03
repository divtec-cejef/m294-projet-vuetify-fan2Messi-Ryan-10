// src/stores/teamsStore.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

// import d'un dictionnaire d'images pour mes équipes
const customImages = {
  Arsenal: 'public/logoTeams/Arsenal.png',
}

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [],
    loading: false,
    error: null,
  }),
  actions: {

    async fetchTeams () {
      try {
        const response = await api.get('search_all_teams.php?l=English_Premier_League')
        // Enrichir chaque équipe avec une image personnalisée
        this.teams = response.data.teams.map(team => ({
          ...team,
          customImage: customImages[team.strTeam] || team.strTeamBadge, // fallback sur logo officiel
        }))
        // this.teams = response.data.teams
        console.log(response.data.teams)
        console.log(this.teams)
      } catch (error) {
        return error
      }
    },
  },
})
