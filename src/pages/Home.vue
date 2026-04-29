<script setup lang="ts">
import Header from '@/components/header.vue'
import Column from '@/components/column.vue'
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import { computed, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { OrderServices } from '@/services/ordersServices.ts'
import useAuthStore from '@/stores/auth.ts'
import { router } from '@/router.ts'

const orderServices = new OrderServices()
const orders = ref<OrderWithItem[]>([])
const ordersWaiting = computed(() => {
  return orders.value.filter((order) => order.status === 'pending')
})
const ordersReady = computed<OrderWithItem[]>(() => {
  return orders.value.filter((order) => order.status === 'ready')
})
const currentOrder = ref<OrderWithItem>()
const authStore = useAuthStore()

// Ne redirige pas immédiatement au montage : attendre la restauration éventuelle du store
// Le watch ci-dessous avec { immediate: true } s'en chargera de façon fiable

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
watch(
  () => route.fullPath,
  async () => {
    // Attendre la restauration asynchrone du store (pinia-plugin-persistedstate hydrate en microtask)
    await nextTick()
    await Promise.resolve()

    // Tentative explicite de restauration depuis localStorage si pinia-plugin n'a pas encore hydraté
    try {
      const restored = authStore.initFromStorage?.()
      if (restored) console.debug('[Home] auth restored from localStorage via initFromStorage')
    } catch (err) {
      console.warn('[Home] initFromStorage failed', err)
    }

    authStore.checkExpiry()

    // Après un petit délai microtask, vérifier l'état restauré
    if (authStore.token && authStore.user) {
      await fetchOrders()
      console.log('Utilisateur connecté, récupération des commandes en cours.')
    } else {
      console.warn('Utilisateur non connecté, redirection vers la page de connexion.')
      router.push('/login')
    }
  },
  { immediate: true },
)

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
