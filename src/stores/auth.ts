// stores/auth.js
import { defineStore } from 'pinia'
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as string | null,
    token: null as string | null,
    expiresAt: null as number | null, // timestamp d'expiration
  }),
  actions: {
    async login(email: string, password: string){
      const res = await fetch(apiUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(res => res.json())

      if (res.token) {
        this.user = res.user.email
        this.token = res.token
        this.expiresAt = Date.now() + 60 * 60 * 24 * 1000 // expire dans 24h
      } else {
        throw new Error('Login failed')
      }
    },
    // Tentative explicite de restauration depuis localStorage (fallback rapide)
    initFromStorage() {
      try {
        const raw = localStorage.getItem('pinia')
        if (!raw) return false
        const parsed = JSON.parse(raw)
        const authState = parsed?.auth
        if (!authState) return false

        // Appliquer uniquement si le store n'est pas déjà hydraté
        if (!this.token && authState.token) {
          this.user = authState.user ?? null
          this.token = authState.token ?? null
          this.expiresAt = authState.expiresAt ?? null
          return true
        }
        return !!this.token
      } catch (err) {
        console.warn('[auth] initFromStorage failed', err)
        return false
      }
    },
    async logout() {
      const data = await fetch(apiUrl + 'logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      this.$reset()
    },
    checkExpiry() {
      if (this.expiresAt && Date.now() > this.expiresAt) {
        this.logout()
      }
    },
  },
  persist: true,
})
export default useAuthStore
