// Création du fichier de configuration pour l'API

// dépendance à installer
import axios from 'axios'

// Récupération de l'URL de base depuis les variables d'environnement
const baseURL = import.meta.env.VITE_API_BASE

/* const api = axios.create({

}) */

const api = axios.create({
  baseURL,
  timeout: 10_000, // 10 secondes de timeout
})

export default api
// Exportation de l'instance Axios pour une utilisation dans l'application
