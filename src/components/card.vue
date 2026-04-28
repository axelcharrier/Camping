<template>
  <div
    class="w-full m-auto text-gray-800 bg-white rounded-lg p-4 mb-4 flex flex-col hover:shadow-md"
  >
    <div class="flex flex-row justify-between w-full">
      <p class="font-bold">{{ order.customer_name }}</p>
      <statusBadge
        :status="order.status === 'pending' ? 'en attente' : 'prête'"
        :icon="order.status === 'pending' ? 'pi pi-clock' : 'pi pi-check'"
        :color="order.status === 'pending' ? 'orange' : 'green'"
      />
    </div>
    <div>
      <div class="mb-6">
        <p v-if="order.status === 'pending'" class="text-gray-500 text-xs">Créée à {{ formatTime(order.created_at) }}</p>
        <p class="text-orange-700 text-sm">Pour {{ order.time }}</p>
      </div>
      <div class="mb-6">
        <p class="text-gray-700">2x Café</p>
        <p class="text-gray-700">2x Café</p>
      </div>
      <div v-if="order.status === 'pending'" class="flex flex-row items-center justify-between gap-1">
        <button class="w-8/10 border-1 border-gray-200 rounded hover:bg-gray-200">
          Marquer prête
        </button>
        <button class="w-2/10 text-red-600 border-1 border-gray-200 rounded hover:bg-red-200">
          Annuler
        </button>
      </div>
      <div v-else>
        <button class="w-full border-1 border-gray-200 rounded bg-green-50 hover:bg-green-100">Servie</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import statusBadge from '@/components/statusBadge.vue'
import type { OrderWithItem } from '@/interfaces/orderWithItemInterface.ts'
import type { PropType } from 'vue'

const props = defineProps({
  order: {
    type: Object as PropType<OrderWithItem>,
    required: true,
  },
})

const order = props.order

const formatTime = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
