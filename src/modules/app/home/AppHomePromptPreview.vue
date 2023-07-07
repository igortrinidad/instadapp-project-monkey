<template>
  <div class="w-full flex flex-col items-start space-y-4 p-2 ml-0 mt-4 md:pt-0 md:pl-4 relative">

    <CopyContent 
      :content="getPrompContentWithVariablesValues(false)"
      class="absolute top-0 right-0"
    />

    <h3 class="text-lg font-bold">Preview</h3>
    <div class="prompt-input-content" v-html="getPrompContentWithVariablesValues(true)"></div>
    
  </div>
</template>

<script setup>

  import CopyContent from '@/src/components/CopyContent.vue'
  import { storeToRefs } from 'pinia'
  const { getPrompContentWithVariablesValues } = storeToRefs(useAppHomeStore())

</script>