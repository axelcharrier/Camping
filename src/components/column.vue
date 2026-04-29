<script setup lang="ts">
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import Card from '@/components/card.vue'
// Ré-émettre les événements vers le parent
const emit = defineEmits(['cancelOrder', 'markReady', 'serveOrder'])
const props = defineProps({
  orders: {
    type: Array as () => OrderWithItem[],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

function deleteOrder(orderId: string) {
  emit('cancelOrder', orderId)
}

function markOrderReady(orderId: string) {
  emit('markReady', orderId)
}

const color = props.type === 'pending' ? 'text-orange-500' : 'text-green-500'
</script>

<template>
  <div class="w-1/2 mx-2 text-gray-800">
    <!--      header-->
    <div class="flex items-center justify-between m-auto">
      <div class="flex flex-row items-center justify-center py-4 gap-3">
        <i v-if="type === 'pending'" class="pi pi-clock" :class="color"></i>
        <i v-if="type !== 'pending'" class="pi pi-check" :class="color"></i>
        <h2 v-if="type === 'pending'" class="text-xl font-bold">En attente</h2>
        <h2 v-if="type !== 'pending'" class="text-xl font-bold">Prête</h2>
      </div>
      <p class="px-2 border-2 rounded border-gray-300">{{ orders.length }}</p>
    </div>
    <!--      affichage des cards-->
    <div v-for="order in orders" :key="order.id">
      <card :order="order" @cancelOrder="deleteOrder(order.id)" @markReady="markOrderReady(order.id)" @serveOrder="deleteOrder(order.id)" />
    </div>
  </div>
</template>

<style scoped></style>
