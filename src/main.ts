import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './index.css'
import App from './App.vue'
import { router } from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import useAuthStore from '@/stores/auth'

const app = createApp(App)

// create and configure pinia once, then pass the configured instance to the app
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

// Tentative de restauration immédiate du store auth depuis localStorage
try {
  const auth = useAuthStore()
  auth.initFromStorage?.()
} catch (e) {
  console.warn('[main] initFromStorage failed', e)
}

app.use(router)

// Global navigation guard: protège les routes marquées { meta: { requiresAuth: true } }
// On appelle `initFromStorage` en fallback pour tenter de restaurer rapidement l'état si besoin.
router.beforeEach((to) => {
  const requiresAuth = to.matched.some(r => (r.meta as any)?.requiresAuth)
  const auth = useAuthStore()
  try {
    // tentative rapide de restauration si la persistance n'a pas encore hydraté
    auth.initFromStorage?.()
  } catch (e) {
    // ignore
  }

  if (requiresAuth && !auth.token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/login' && auth.token) {
    const redirect = (to.query.redirect as string) || '/'
    return { path: redirect }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
