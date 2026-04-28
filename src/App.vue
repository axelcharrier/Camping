<script setup lang="ts">
import Header from '@/components/header.vue'
import Column from '@/components/column.vue'
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import { inject, onMounted, ref } from 'vue'
import { OrderServices } from '@/services/ordersServices.ts'

const orderServices = new OrderServices()
const orders = ref<OrderWithItem[]>([])
const tg: number = 3
const ordersWaiting = ref<OrderWithItem[]>([])
const ordersReady = ref<OrderWithItem[]>([])

onMounted(async () => {
  const response = await orderServices?.getOrdersAsync()
  orders.value = await response?.json()
  ordersWaiting.value = orders.value.filter((order) => order.status === 'pending')
  ordersReady.value = orders.value.filter((order) => order.status === 'ready')
})
</script>

<template>
  <div class="w-full m-auto bg-white">
    <Header :orderNumber="orders.length" />
  </div>
  <div class="w-full bg-gray-50">
    <div class="w-3/4 m-auto text-gray-800 flex h-screen">
      <column :orders="ordersWaiting" type="pending" />
      <column :orders="ordersReady" type="ready" />
    </div>
  </div>
</template>
