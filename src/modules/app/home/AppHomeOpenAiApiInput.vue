<template>
  <div class="w-full flex flex-col">
    <label>OpenAI Api Key</label>
    <input 
      class="input-classes focus:ring-indigo-500"
      type="text"
      placeholder="Insert the Open AI Api Key"
      v-model="openAiApiKey"
    />
  </div>
</template>
<script setup>

  import { storeToRefs } from 'pinia'
  const { openAiApiKey } = storeToRefs(useAppHomeStore())

</script>