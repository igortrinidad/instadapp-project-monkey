<template>
  <div class="w-full flex flex-col items-start space-y-4 p-2 pl-0 md:pl-4">
    <h3 class="text-lg font-bold">Preview</h3>
    <div class="prompt-input-content">{{ getPromptContent }}</div>
  </div>
</template>

<script setup>

  import { storeToRefs } from 'pinia'
  const { getPromptContent } = storeToRefs(useAppHomeStore())

</script>