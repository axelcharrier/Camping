<script setup lang="ts">
import type { Order } from '@/interfaces/orderInterface.ts'
import card from '@/components/card.vue'
  const props = defineProps({
    orders: {
      type: Array as () => Order[],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  })

const color = props.type === 'pending' ? 'text-orange-500' : 'text-green-500'
</script>

<template>
  <div class="w-1/2 mx-2 text-gray-800 ">
<!--      header-->
    <div class="flex items-center justify-between m-auto">
      <div class="flex flex-row items-center justify-center py-4 gap-3">
        <i class="pi pi-clock" :class="color"></i>
        <h2 class="text-xl font-bold">En attente</h2>
      </div>
      <p class="px-2 border-2 rounded border-gray-300">{{orders.length}}</p>
    </div>
<!--      affichage des cards-->
    <div v-for="order in orders" :key="order.id">
        <card :order="order"/>
    </div>
  </div>
</template>

<style scoped></style>
