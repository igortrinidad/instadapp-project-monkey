<template>
  <div class="w-full flex flex-col space-y-4 relative">
    <div class="w-full flex flex-col space-y-2">
      <h3 class="text-lg font-bold">Prompt</h3>
      <div id="prompt-input-container" class="group">
        <div 
          class="relative" 
          @focus.capture="showPlaceholder = false" 
          @blur.capture="setVariables()"
        >
          <div 
            class="prompt-input-content" 
            ref="promptInputRef"
            contenteditable="true"
            @input="onInput"
          ></div>
          <div v-if="!getPromptContent.length" @click="onInput()" class="prompt-input-placeholder absolute top-0 left-2 select-none opacity-80 pointer-events-none">
            Please, add a prompt...
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>

  import { storeToRefs } from 'pinia'

  const promptInputRef = ref(null)
  const { getPromptContent } = storeToRefs(useAppHomeStore())

  const showPlaceholder = ref(true)

  onMounted(() => {
    promptInputRef.value.innerHTML = getPromptContent.value
    useAppHomeStore().setVariables()
  })

  const onInput = () => {
    useAppHomeStore().setPromptContent(promptInputRef.value.innerText)
  }

  const setVariables = () => {
    useAppHomeStore().setVariables()
  }
  
</script>

<style lang="scss">

  #prompt-input-container {
    @apply
      block
      border
      border-gray-400/30
      w-full
      text-lg
      rounded-lg
      p-4
      bg-gray-200/10
      hover:border-violet-500 focus:border-violet-500 focus:ring
    ;
  }

  .prompt-input-placeholder {
    color: #a0a0a0;
    top: 0;
    pointer-events: none;
    user-select: none;
    position: absolute;
    opacity: 0;
    transition: 0.2s padding ease-in-out;
  }

  .prompt-input-content {
    overflow-x: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
    z-index: 1;
    min-height: 100px !important;
    min-height: 30px;
    height: auto;
    padding: 0 0 0 2px;
    outline: 0;
    transition: 0.2s padding ease-in-out;
    @apply group-focus:border-violet-500 ;

    &:empty + .prompt-input-placeholder {
      opacity: 1;
    }

    &:focus + .prompt-input-placeholder {
      padding: 0 6px 0px;
    }

    

  }

</style>