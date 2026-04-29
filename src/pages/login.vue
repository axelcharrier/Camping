<template>
  <div class="w-full bg-gray-50 h-screen text-gray-800">
    <div class="w-full m-auto mt-6 h-screen flex items-center justify-center">
      <div class="lg:w-1/2 w-full bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Se connecter</h2>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model="email"
                required
                class="w-full px-3 py-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2"
                placeholder="adresse@example.com"
              />
            </div>

            <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="password">Mot de passe</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                placeholder="Votre mot de passe"
              />
              <button type="button" @click="toggleShowPassword" class="absolute right-2 top-2 text-sm text-gray-500">
                {{ showPassword ? 'Cacher' : 'Afficher' }}
              </button>
            </div>
          </div>

          <div v-if="error" class="text-sm text-red-600">{{ error }}</div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-60"
            >
              <span v-if="!loading">Se connecter</span>
              <span v-else>Connexion...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useAuthStore from '@/stores/auth.ts'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  error.value = null
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    // redirection vers la destination demandée ou la home
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } catch (err: any) {
    console.error('Erreur lors de la connexion:', err)
    // message utilisateur simplifié; affichage du message si disponible
    error.value = err?.message || 'Échec de la connexion. Vérifiez vos identifiants.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
