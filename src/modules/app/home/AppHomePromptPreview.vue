<template>
  <div class="w-full flex flex-col items-start space-y-4 p-2 pl-0 pt-4 md:pt-0 md:pl-4">
    <h3 class="text-lg font-bold">Preview</h3>
    <div class="prompt-input-content" v-html="getPrompContentHighlightingVariables"></div>
  </div>
</template>

<script setup>

  import { storeToRefs } from 'pinia'
  const { getPrompContentHighlightingVariables } = storeToRefs(useAppHomeStore())

</script>