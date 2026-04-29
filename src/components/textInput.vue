<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  // support standard v-model prop name
  modelValue: {
    type: String,
    required: false,
    default: '',
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
})

// expose l'événement standard pour v-model
const emit = defineEmits(['update:modelValue'])

function onInput(e: Event) {
  const target = e.target as HTMLInputElement | null
  emit('update:modelValue', target ? target.value : '')
}
</script>

<template>
  <div class="flex flex-col items-start mb-2 w-full">
    <label class="font-bold text-sm" :for="label" :id="label">{{ label }}</label>
    <input class="rounded-md bg-gray-100 w-full h-8" :type="type" :name="label" :value="modelValue" @input="onInput" :required="required" />
  </div>
</template>

<style scoped></style>
