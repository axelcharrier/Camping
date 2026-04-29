<script setup lang="ts">
import type { orderItemCreate } from '@/interfaces/orderItemCreateInterface'
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object as () => orderItemCreate,
    required: true,
  },
})
const emit = defineEmits(['addItem', 'removeItem', 'cancelItem', 'updateNotes'])
const note = ref<string>('')

function updateNotes(itemName: string, notes: string) {
  emit('updateNotes', itemName, notes)
}

</script>

<template>
  <div class="w-9/10 m-auto rounded-lg p-4 bg-white border-1 border-gray-200">
    <div class="w-full flex flex-row justify-between">
      <p class="font-bold">{{ item.name }}</p>
      <button class="text-red-500 hover:bg-red-50 px-2 py-1 rounded pt-2" @click="$emit('cancelItem', item.name)"><i class="pi pi-times" style="font-size: 1rem"></i></button>
    </div>
    <div class="flex flex-row gap-4 items-center justify-start mb-6">
      <button class="border-gray-200 border-1 w-[35px] rounded text-2xl" @click="$emit('removeItem', item.name)">-</button>
      <p>{{ item.quantity }}</p>
      <button class="border-gray-200 border-1 w-[35px] rounded text-2xl" @click="$emit('addItem', item.name)">+</button>
    </div>
    <div>
      <p class="text-xs font-bold">Notes (optionnel)</p>
      <textarea
        class="w-full border-gray-200 border-1 rounded p-2"
        rows="3"
        v-model="note"
        placeholder="Notes"
        @input="updateNotes(item.name, note)"
      />
    </div>
  </div>
</template>

<style scoped></style>
