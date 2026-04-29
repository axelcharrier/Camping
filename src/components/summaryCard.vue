<script setup lang="ts">
import type { orderItemCreate } from '@/interfaces/orderItemCreateInterface'
import type { OrderItem } from '@/interfaces/orderItemInterface'
import itemCard from '@/components/itemCard.vue'
const props = defineProps({
  itemList: {
    type: Array as () => orderItemCreate[],
    required: true,
  },
})

const emit = defineEmits(['addItem', 'removeItem', 'cancelItem', 'updateNotes'])

function handleAdd(itemName: string) {
  emit('addItem', itemName)
}

function handleRemove(itemName: string) {
  emit('removeItem', itemName)
}

function handleCancel(itemName: string) {
  emit('cancelItem', itemName)
}

function updateNotes(itemName: string, notes: string) {
  emit('updateNotes', itemName, notes)
}
</script>

<template>
  <div
    class="w-full rounded-lg bg-white p-4 flex flex-col items-start gap-4 m-4 border-1 border-gray-200"
  >
    <p class="font-bold text-lg w-9/10 pl-6">Articles</p>
    <div
      v-if="itemList.length !== 0"
      v-for="(item, index) in itemList"
      :key="index"
      class="flex flex-col items-start gap-2 w-full"
    >
      <itemCard
        :item="item"
        @addItem="handleAdd"
        @removeItem="handleRemove"
        @cancelItem="handleCancel"
        @updateNotes="updateNotes"
      />
    </div>
    <div v-else class="w-full h-[200px] flex items-center justify-center">
      <p class="text-gray-500">Aucun article ajouté. Sélectionnez des articles dans le menu.</p>
    </div>
  </div>
</template>

<style scoped></style>
