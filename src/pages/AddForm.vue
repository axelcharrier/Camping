<script setup lang="ts">
import FormHeader from '@/components/formHeader.vue'
import ArticlesCard from '@/components/articlesCard.vue'
import ClientInformationCard from '@/components/clientInformationCard.vue'

import SummaryCard from '@/components/summaryCard.vue'
import { computed, ref } from 'vue'
import type { orderItemCreate } from '@/interfaces/orderItemCreateInterface.ts'
import { OrderServices } from '@/services/ordersServices.ts'
import { router } from '@/router.ts'

const orderServices = new OrderServices()
const commandItems = ref<orderItemCreate[]>([])
const emit = defineEmits(['addItem', 'removeItem', 'cancelItem', 'updateNotes'])
const customerName = ref<string>('')
const desiredTime = ref<string>('')
function addItem(itemName: string) {
  const existingItem = commandItems.value.find((item) => item.name === itemName)
  if (existingItem) {
    existingItem.quantity += 1
    return
  }
  const newItem: orderItemCreate = {
    name: itemName,
    quantity: 1,
  }
  commandItems.value.push(newItem)
}

function removeItem(itemName: string) {
  const existingItem = commandItems.value.find((item) => item.name === itemName)
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1
    } else {
      commandItems.value = commandItems.value.filter((item) => item.name !== itemName)
    }
  }
}

function cancelItem(itemName: string) {
  commandItems.value = commandItems.value.filter((item) => item.name !== itemName)
}

const isSubmittable = computed(() => {
  return commandItems.value.length > 0
    ? 'bg-gray-800 text-gray-50 py-1 px-4 rounded-lg'
    : 'bg-gray-200 text-gray-800 py-1 px-4 rounded-lg'
})

function submitCommand() {
  if (commandItems.value.length < 1) {
    alert('Veuillez ajouter au moins un article à la commande avant de la soumettre.')
    return
  }

  const orderData = {
    customer_name: customerName.value,
    time: new Date().toTimeString().slice(0, 5),
    status: 'pending',
    desired_time: desiredTime.value,
    items: commandItems.value,
  }
  console.log(orderData)
  orderServices.addOrderAsync(orderData).then(() => {
    router.push('/')
  })
}

function updateNotes(itemName: string, notes: string) {
  const existingItem = commandItems.value.find((item) => item.name === itemName)
  if (existingItem) {
    existingItem.notes = notes
  }
}

function updateName(name: string) {
  customerName.value = name
}

function updateTime(time: string) {
  desiredTime.value = time
}
</script>

<template>
  <div class="w-full m-auto bg-white">
    <formHeader />
  </div>
  <div class="w-full bg-gray-50">
    <div class="w-full lg:w-3/4 m-auto text-gray-800 flex h-[90vh]" style="overflow-y: auto">
      <div class="w-1/2 p-4">
        <articlesCard @addItemToCommand="addItem" />
      </div>
      <div class="w-1/2 p-4">
        <clientInformationCard @updateName="updateName" @updateTime="updateTime" />
        <summaryCard
          :itemList="commandItems"
          @cancelItem="cancelItem"
          @addItem="addItem"
          @removeItem="removeItem"
          @updateNotes="updateNotes"
        />
        <button
          class="w-full py-3 mx-4 rounded-lg bg-gray-300"
          @click="submitCommand"
          :class="isSubmittable"
        >
          Créer la commande
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
