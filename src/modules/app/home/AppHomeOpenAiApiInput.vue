<template>
  <div class="w-full flex flex-col">
    <label>OpenAI Api Key</label>
    <input 
      class="input-classes focus:ring-indigo-500 mt-1"
      type="text"
      placeholder="Insert Open AI Api Key to generate responses"
      v-model="openAiApiKey"
    />
  </div>
</template>
<script setup>

  import { storeToRefs } from 'pinia'
  const { openAiApiKey } = storeToRefs(useAppHomeStore())

</script>