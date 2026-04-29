<script setup lang="ts">
  const props = defineProps({
    status: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  })

  const colorStyles: Record<string, string> = {
    orange: 'text-orange-800 border-orange-800 bg-orange-100',
    green: 'text-green-800 border-green-800 bg-green-100',
  }

</script>

<template>
  <div class="flex flex-row items-center justify-center gap-2 border-1 text-sm rounded px-2" :class="colorStyles[color] || colorStyles.gray">
    <i :class="icon"></i>
    <p>{{ status }}</p>
  </div>
</template>

<style scoped></style>
