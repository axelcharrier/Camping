<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['click'])
</script>

<template>
  <button class="text-gray-50 py-1 px-4 rounded-lg" @click="$emit('click', name)">{{name}}</button>
</template>

<style scoped></style>
