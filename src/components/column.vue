<script setup lang="ts">
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import Card from '@/components/card.vue'
import { computed } from 'vue'
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

const parseOrderTime = (t?: string) => {
  if (!t) return 0

  // Si c'est juste une heure au format "HH:mm" ou "HH:mm:ss"
  const hhmm = /^\s*(\d{1,2}):(\d{2})(:(\d{2}))?\s*$/.exec(t)
  if (hhmm) {
    const hours = Number(hhmm[1])
    const minutes = Number(hhmm[2])
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes).getTime()
  }

  // Tenter de parser comme date complète ISO
  const parsed = Date.parse(t)
  return isNaN(parsed) ? 0 : parsed
}

const sortedOrders = computed(() => {
  return [...props.orders].slice().sort((a, b) => {
    const timeA = a.desired_time || a.time || a.created_at
    const timeB = b.desired_time || b.time || b.created_at

    return parseOrderTime(timeA) - parseOrderTime(timeB)
  })
})

const color = computed(() => (props.type === 'pending' ? 'text-orange-500' : 'text-green-500'))
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
      <p class="px-2 border-2 rounded border-gray-300">{{ sortedOrders.length }}</p>
    </div>
    <!--      affichage des cards-->
    <div v-for="order in sortedOrders" :key="order.id">
      <card
        :order="order"
        @cancelOrder="deleteOrder(order.id)"
        @markReady="markOrderReady(order.id)"
        @serveOrder="deleteOrder(order.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
