<template>
  <div class="w-full flex flex-col space-y-8 items-start">
    
    <ClientOnly>
      <AppHomePromptInput />

      <div class="w-full border border-gray-400/30 text-lg rounded-lg p-4 bg-gray-200/10 grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-400/40">
        <AppHomeInputsList />
        <AppHomePromptPreview />
      </div>
    </ClientOnly>
    
    <div class="w-full flex space-x-4">
      <button 
        class="btn btn-primary btn-lg" 
      >
        Run prompt
      </button>
    </div>

    <pre>{{ variables }}</pre>

  </div>
</template>

<script setup>
  import AppHomePromptInput from '@/src/modules/app/home/AppHomePromptInput.vue'
  import AppHomeInputsList from '@/src/modules/app/home/AppHomeInputsList.vue'
  import AppHomePromptPreview from '@/src/modules/app/home/AppHomePromptPreview.vue'
  import { storeToRefs } from 'pinia'

  const { variables } = storeToRefs(useAppHomeStore())

</script>