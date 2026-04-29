<script setup lang="ts">
import Header from '@/components/header.vue'
import Column from '@/components/column.vue'
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { OrderServices } from '@/services/ordersServices.ts'

const orderServices = new OrderServices()
const orders = ref<OrderWithItem[]>([])
const ordersWaiting = computed(() => {
  return orders.value.filter((order) => order.status === 'pending')
})
const ordersReady = computed<OrderWithItem[]>(() => {
  return orders.value.filter((order) => order.status === 'ready')
})
const currentOrder = ref<OrderWithItem>()

async function fetchOrders() {
  try {
    const response = await orderServices?.getOrdersAsync()
    const data = await response?.json()
    orders.value = data ?? []
  } catch (err) {
    console.error('Erreur fetchOrders:', err)
    orders.value = []
  }
}

// Exécuter fetchOrders dès l'arrivée sur la page et à chaque changement de route
const route = useRoute()
watch(() => route.fullPath, async () => {
  await fetchOrders()
}, { immediate: true })

function handleCancel(orderId: string) {
  orders.value = orders.value.filter((order) => order.id !== orderId)
  orderServices.deleteOrderAsync(orderId)
}

function handleServe(orderId: string) {
  orders.value = orders.value.filter((order) => order.id !== orderId)
  orderServices.deleteOrderAsync(orderId)
}

function handleMarkReady(orderId: string) {
  currentOrder.value = orders.value.find((order) => order.id === orderId)
  if (currentOrder.value) {
    currentOrder.value.status = 'ready'
  }
  orderServices.markOrderReadyAsync(orderId)
}
</script>

<template>
  <div class="w-full m-auto bg-white">
    <Header :orderNumber="orders.length" />
  </div>
  <div class="w-full bg-gray-50">
    <div class="w-full lg:w-3/4 m-auto text-gray-800 flex h-[90vh]" style="overflow-y: auto">
      <Column
        :orders="ordersWaiting"
        type="pending"
        @cancelOrder="handleCancel"
        @markReady="handleMarkReady"
        @serveOrder="handleServe"
      />
      <Column
        :orders="ordersReady"
        type="ready"
        @cancelOrder="handleCancel"
        @markReady="handleMarkReady"
        @serveOrder="handleServe"
      />
    </div>
  </div>
</template>
