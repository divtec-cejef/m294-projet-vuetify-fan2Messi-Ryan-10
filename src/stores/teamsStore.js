// src/stores/teamsStore.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [],
    favorites: [], // tableau des équipes favorites
    loading: false,
    error: null,
  }),

  actions: {
    // --- Récupération des équipes depuis l’API ---
    async fetchTeams () {
      try {
        const response = await api.get('search_all_teams.php?l=English_Premier_League')
        this.teams = response.data.teams.map(team => ({
          ...team,
          customImage: team.strBadge || '', // utiliser le logo officiel de l'API
        }))
      } catch (error) {
        this.error = error
      }
    },

    // --- Récupération des équipes depuis un JSON local ---
    async fetchTeamsFromJSON () {
      try {
        this.loading = true
        const response = await fetch('/src/data/teams.json') // chemin vers ton JSON local
        const data = await response.json()

        let teamsArray = []

        if (Array.isArray(data)) {
          // Le JSON est directement un tableau
          teamsArray = data
        } else if (data && Array.isArray(data.teams)) {
          // Le JSON contient un objet avec une propriété 'teams'
          teamsArray = data.teams
        } else {
          // Cas par défaut
          teamsArray = data
        }

        this.teams = teamsArray.map(team => ({
          ...team,
          customImage: team.strBadge || '', // pour compatibilité avec ton TeamCard
        }))

        console.log('✅ Équipes chargées depuis JSON :', this.teams)
      } catch (error) {
        this.error = error
        console.log('❌ Erreur fetchTeamsFromJSON :', error)
      } finally {
        this.loading = false
      }
    },

    // --- Initialisation du store ---
    async init () {
      await this.fetchTeams()
      await this.fetchTeamsFromJSON()
    },

    // --- Gestion des favoris ---
    toggleFavorite (team) {
      const exists = this.favorites.find(fav => fav.idTeam === team.idTeam)

      if (exists) {
        // Si déjà favori → on retire
        this.favorites = this.favorites.filter(fav => fav.idTeam !== team.idTeam)
      } else {
        // Sinon → on ajoute
        this.favorites.push(team)
      }

      this.saveFavorites()
    },

    isFavorite (team) {
      return this.favorites.some(fav => fav.idTeam === team.idTeam)
    },

    saveFavorites () {
      localStorage.setItem('team_favorites', JSON.stringify(this.favorites))
    },

    loadFavorites () {
      const saved = localStorage.getItem('team_favorites')
      if (saved) {
        this.favorites = JSON.parse(saved)
      }
    },
  },
})
