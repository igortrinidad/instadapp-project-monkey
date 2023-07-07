<template>
  <div class="w-full flex flex-col space-y-8 items-start">
    
    <ClientOnly>
      <AppHomePromptInput />

      <div class="w-full card grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-400/40">
        <AppHomeInputsList />
        <AppHomePromptPreview />
      </div>
    </ClientOnly>
    
    <AppHomeOpenAiApiInput />

    <div class="w-full flex space-x-4">
      <button 
        class="btn btn-primary btn-lg"
        @click="runPrompt()"
        :disabled="getInputsHasEmptyValue"
      >
        <Icon v-if="isLoading" name="svg-spinners:90-ring-with-bg" />
        Run prompt
      </button>
    </div>

    <AppHomeResponseHistory />

  </div>
</template>

<script setup>
  import AppHomePromptInput from '@/src/modules/app/home/AppHomePromptInput.vue'
  import AppHomeInputsList from '@/src/modules/app/home/AppHomeInputsList.vue'
  import AppHomePromptPreview from '@/src/modules/app/home/AppHomePromptPreview.vue'
  import AppHomeOpenAiApiInput from '@/src/modules/app/home/AppHomeOpenAiApiInput.vue'
  import AppHomeResponseHistory from '@/src/modules/app/home/AppHomeResponseHistory.vue'

  import { storeToRefs } from 'pinia'
  const { getInputsHasEmptyValue } = storeToRefs(useAppHomeStore())

  const isLoading = ref(false)

  const runPrompt = async () => {
    if(isLoading.value) return
    isLoading.value = true
    try {
      await useAppHomeStore().generateChatGptResponse()
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      alert('Something went wrong on your request, please try again later or check your OpenAI Api Key.')
    }
  }

</script>