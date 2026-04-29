<script setup lang="ts">
defineProps({
  orderNumber: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="p-4 text-gray-800 flex items-center justify-between lg:w-3/4 w-full m-auto">
    <div class="flex flex-col items-start justify-between">
      <h1 class="text-2xl font-bold">Gestion des commandes</h1>
      <p class="text-sm text-gray-500">{{ orderNumber }} commandes actives</p>
    </div>
    <nav>
      <router-link to="/add" class="text-white bg-gray-800 text-sm px-4 py-3 rounded-md flex">
        <p class="mr-4">+</p>
        Nouvelle commande
      </router-link>
    </nav>
  </div>
</template>

<style scoped></style>
