<script setup lang="ts">
import Header from '@/components/header.vue'
import type { Order } from '@/interfaces/orderInterface.ts'
import { inject, onMounted, ref } from 'vue'
import { OrderServices } from '@/services/ordersServices.ts'

const orderServices = new OrderServices()
const orders = ref<Order[]>([])
const tg:number = 3;

onMounted(async() => {
  const response = await orderServices?.getOrdersAsync()
  orders.value = await response?.json();
})

</script>

<template>
  <div class="min-h-screen w-3/4 m-auto">
    <Header :orderNumber="orders.length" />
  </div>
</template>

<style scoped></style>
