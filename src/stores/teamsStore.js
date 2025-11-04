// src/stores/teamsStore.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

// Dictionnaire d'images personnalisées
const customImages = {
  'Arsenal': '/logoTeams/Arsenal.png',
  'Aston Villa': '/logoTeams/AstonVilla.png',
  'Bournemouth': '/logoTeams/Bournemouth.png',
  'Brentford': '/logoTeams/Brentford.png',
  'Brighton and Hove Albion': '/logoTeams/Brighton.png',
  'Burnley': '/logoTeams/Burnley.png',
  'Chelsea': '/logoTeams/Chelsea.png',
  'Crystal Palace': '/logoTeams/CrystalPalace.png',
  'Everton': '/logoTeams/Everton.png',
  'Fulham': '/logoTeams/Fulham.png',
}

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [],
    favorites: [], // tableau des équipes favorites
    loading: false,
    error: null,
  }),

  actions: {
    // --- Récupération des équipes depuis l’API ---
    async fetchTeams() {
      try {
        const response = await api.get('search_all_teams.php?l=English_Premier_League')
        this.teams = response.data.teams.map(team => ({
          ...team,
          customImage: customImages[team.strTeam] || team.strTeamBadge, // fallback si image absente
        }))
      } catch (error) {
        this.error = error
      }
    },

    // --- Gestion des favoris ---
    toggleFavorite(team) {
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

    isFavorite(team) {
      return this.favorites.some(fav => fav.idTeam === team.idTeam)
    },

    saveFavorites() {
      localStorage.setItem('team_favorites', JSON.stringify(this.favorites))
    },

    loadFavorites() {
      const saved = localStorage.getItem('team_favorites')
      if (saved) {
        this.favorites = JSON.parse(saved)
      }
    },
  },
})
