// src/stores/teamsStore.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

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
        this.teams = response.data.teams
        console.log(response.data.teams)
        console.log(this.teams)
      } catch (error) {
        return error
      }
    },
    /*
    async fetchTeams (name = 'Arsenal') {
      this.loading = true
      this.error = null

      try {
        const useLocal = import.meta.env.VITE_USE_LOCAL_JSON === 'true'
        if (useLocal) {
          const res = await fetch('/data/teams.json')
          const data = await res.json()
          this.teams = data.teams || data
        } else {
          const { data } = await api.get('/searchteams.php', {
            params: { t: name },
          })
          this.teams = data.teams || []
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },*/
  },
})
