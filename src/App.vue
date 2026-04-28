<script setup lang="ts">
import Header from '@/components/header.vue'
import Column from '@/components/column.vue'
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import { onMounted, ref } from 'vue'
import { OrderServices } from '@/services/ordersServices.ts'

const orderServices = new OrderServices()
const orders = ref<OrderWithItem[]>([])
const ordersWaiting = ref<OrderWithItem[]>([])
const ordersReady = ref<OrderWithItem[]>([])
const currentOrder = ref<OrderWithItem>()

onMounted(async () => {
  const response = await orderServices?.getOrdersAsync()
  orders.value = await response?.json()
  ordersWaiting.value = orders.value.filter((order) => order.status === 'pending')
  ordersReady.value = orders.value.filter((order) => order.status === 'ready')
})

function handleCancel(orderId: string) {
  orders.value = orders.value.filter((order) => order.id !== orderId)
  ordersWaiting.value = ordersWaiting.value.filter((order) => order.id !== orderId)
  ordersReady.value = ordersReady.value.filter((order) => order.id !== orderId)
  orderServices.deleteOrderAsync(orderId)
}

function handleServe(orderId: string) {
  orders.value = orders.value.filter((order) => order.id !== orderId)
  ordersWaiting.value = ordersWaiting.value.filter((order) => order.id !== orderId)
  ordersReady.value = ordersReady.value.filter((order) => order.id !== orderId)
  orderServices.deleteOrderAsync(orderId)
}

function handleMarkReady(orderId: string) {
  currentOrder.value = orders.value.find((order) => order.id === orderId)
  ordersWaiting.value = ordersWaiting.value.filter((order) => order.id !== orderId)
  if (currentOrder.value) {
    currentOrder.value.status = 'ready'
    ordersReady.value = [...ordersReady.value, currentOrder.value]
  } else {
    ordersReady.value = ordersReady.value.filter((order) => order.id !== orderId)
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
