<template>
  <div class="w-full flex flex-col space-y-4">

    <h3 class="text-lg font-bold">History</h3>

    <div class="w-full card" v-if="!history.length">
      <p>You haven't generated any response yet.</p>
    </div>

    <div 
      class="w-full card flex flex-col space-y-2"
      v-for="item in history"
      :key="item.prompt"
    >
      <p class="text-sm text-gray-400">{{ useFormatDateToEnUs(item.createdAt) }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-400/40">
        <div class="w-full flex flex-col items-start space-y-4 p-2 relative">

          <CopyContent 
            :content="item.prompt"
            class="absolute top-0 right-0"
          />

          <h3 class="text-lg font-bold">Prompt</h3>
          <p>{{ item.prompt }}</p>

        </div>
        <div class="w-full flex flex-col items-start space-y-4 mt-4 md:mt-0 p-2 pl-0 md:pl-4 relative">

          <CopyContent 
            :content="item.response"
            class="absolute top-0 right-0"
          />

          <h3 class="text-lg font-bold">Response</h3>
          <p>{{ item.response }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import CopyContent from '@/src/components/CopyContent.vue'
  import { storeToRefs } from 'pinia'
  const { history } = storeToRefs(useAppHomeStore())
</script>
