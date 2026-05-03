<script setup lang="ts">
import textInput from './textInput.vue'
import { ref } from 'vue'

const name = ref('Client')
const time = ref('')
const emit = defineEmits(['updateName', 'updateTime'])
</script>

<template>
  <div
    class="w-full rounded-lg bg-white p-4 flex-col items-start gap-4 m-4 border-1 border-gray-200"
  >
    <h2 class="text-lg font-bold mb-5">Informations</h2>
    <div class="w-full flex flex-col gap-4 mb-5">
      <textInput
        label="Nom du client*"
        placeholder="Entrez le nom du client"
        v-model="name"
        :required="true"
        type="text"
        @input="$emit('updateName', name)"
      />
      <textInput
        label="Heure souhaitée (optionnel)"
        placeholder="Entrez le nom du client"
        v-model="time"
        type="time"
        @input="$emit('updateTime', time)"
      />
    </div>
  </div>
</template>

<style scoped></style>
