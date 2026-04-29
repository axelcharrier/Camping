<script setup lang="ts">
import useAuthStore from '@/stores/auth.ts'
import { router } from '@/router.ts'

defineProps({
  orderNumber: {
    type: Number,
    required: true,
  },
})
const authStore = useAuthStore()
function logout() {
  authStore.logout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <div class="p-4 text-gray-800 flex items-center justify-between lg:w-3/4 w-full m-auto">
    <div class="flex flex-col items-start justify-between">
      <h1 class="text-2xl font-bold">Gestion des commandes</h1>
      <p class="text-sm text-gray-500">{{ orderNumber }} commandes actives</p>
    </div>
    <nav class="flex items-center">
      <button @click="logout" class="text-red-500 border-1 border-red-500 bg-red-50 text-sm px-4 py-3 rounded-md mr-4">
        <i class="pi pi-sign-out"></i>
      </button>
      <router-link to="/add" class="text-white bg-gray-800 text-sm px-4 py-3 rounded-md flex">
        <p class="mr-4">+</p>
        Nouvelle commande
      </router-link>
    </nav>
  </div>
</template>

<style scoped></style>
