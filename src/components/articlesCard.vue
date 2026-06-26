<script setup lang="ts">
import ButtonArticle from '@/components/buttonArticle.vue'
import type { orderItemCreate } from '@/interfaces/orderItemCreateInterface.ts'
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['addItemToCommand'])

const menuItems = ref([
  { category: 'Pizza', items: ['Pizza reine', 'Pizza 3 Fromages', 'Pizza raffinée', 'Pizza Montagnarde', 'Pizza Diavola', 'Pizza All Pollo'] },
  { category: 'Panini', items: ['Panini jambon', 'Panini poulet', 'Panini chocolat'] },
])

const currentCategorie = ref<string>('')
const displayedItems = computed(() => {
  const category = menuItems.value.find((cat) => cat.category === currentCategorie.value)
  return category ? category.items : []
})

onMounted(() => {
  currentCategorie.value = 'Pizza'
})

function handleClick(category: string) {
  currentCategorie.value = category
}

const isActive = (category: string) => {
  return category === currentCategorie.value
    ? 'bg-gray-800 text-gray-50 py-1 px-4 rounded-lg'
    : 'bg-gray-200 text-gray-800 py-1 px-4 rounded-lg'
}

</script>

<template>
  <div
    class="w-full rounded-lg bg-white p-4 flex flex-col items-start gap-4 m-4 border-1 border-gray-200"
  >
    <h2 class="text-lg font-bold mb-5">Menu</h2>
    <div class="w-full flex flex-row gap-2 mb-5">
      <div v-for="item in menuItems" :key="item.category" class="flex gap-3">
        <ButtonArticle
          :name="item.category"
          @click="handleClick(item.category)"
          :class="isActive(item.category)"
        />
      </div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="item in displayedItems"
        @click="$emit('addItemToCommand', item.toString())"
        :key="item"
        class="py-3 px-4 bg-white border-1 border-gray-300 rounded-lg mb-2 w-full flex"
        style="cursor: pointer"
      >
        <p class="mr-6">+</p>
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
