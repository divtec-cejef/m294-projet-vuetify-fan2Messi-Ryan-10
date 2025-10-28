/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createPinia } from 'pinia' // <-- ajouté

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify' // <-- ajouté

import router from './router' // <-- ajouté

// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

// Intégration de Pinia et Vuetify
app.use(createPinia()) // <-- ajouté
app.use(vuetify)
app.use(router)
app.mount('#app')
