<template>
  <div class="w-full flex flex-col space-y-4 relative">

    <div class="w-full flex flex-col space-y-2">
      <label>Prompt</label>
      <div id="prompt-input-container" class="group">
        <div 
          class="prompt-input-text-group group-focus:border-violet-500" 
          @click="onInput()" 
          @focus.capture="showPlaceholder = false" 
          @blur.capture="calculateTokens()"
        >
          <div 
            id="prompt-input-content" 
            class="group-focus:border-violet-500" 
            ref="promptInputRef"
            contenteditable="true"
            @input="onInput"
          ></div>
          <div v-if="showPlaceholder && !messageContent.length" @click="onInput()" class="absolute top-0 left-2 select-none opacity-80">
            Please, add a prompt...
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-full flex space-x-4">
      <button 
        class="btn btn-primary btn-sm" 
        @click="storeMessage()" 
        :class="{ 'loading': isLoading }"
      >
        Generate prompt
      </button>
    </div>

    <pre>{{ tokensQuantity }}</pre>
    <pre>{{ tokensValue }}</pre>
    <pre>{{ variables }}</pre>
    <pre>{{ messageContent }}</pre>

  </div>
</template>
<script setup>

  import { GPTTokens } from 'gpt-tokens'
  import { StringHelpers } from '@igortrindade/lazyfy'
  import { promptExample, regexVariablePattern } from '@/src/util/enums'
  import { slugifyVariableName } from '@/src/util/functions'

  const route = useRoute()
  const users = ref([])

  const emit = defineEmits(['update'])
  
  const promptInputRef = ref(null)

  const isUpdatingContent = ref(false)
  const messageContent = ref(promptExample)
  const variables = ref([])
  const showPlaceholder = ref(true)
  const isLoading = ref(false)
  const tokensQuantity = ref(0)
  const tokensValue = ref(0)

  onMounted(() => {
    promptInputRef.value.innerHTML = promptExample
    parseVariables()
  })

  // const onInput = () => {
  //   showPlaceholder.value = false
  //   promptInputRef.value.focus()
  // }

  const onInput = () => {
    messageContent.value = promptInputRef.value.innerText
    parseVariables()
  }

  const parseVariables = () => {
    const matches = [...messageContent.value.matchAll(regexVariablePattern)]
    variables.value = matches.map(match => match[1]).map((v) => slugifyVariableName(v) )
  }

  const calculateTokens = () => {
    const gptTokens = new GPTTokens({
      model   : 'gpt-3.5-turbo-0613',
      messages: [
        { 'role': 'user', 'content': messageContent.value },
      ],
    })

    tokensQuantity.value = gptTokens.usedTokens
    tokensValue.value = gptTokens.usedUSD
  }

  const storeMessage = () => {
    
  }
  
</script>

<style lang="scss">


  /** This is the css of the input **/
#prompt-input-container {
  @apply block border border-gray-400/30 w-full text-lg rounded-lg p-4;
}

.prompt-input-text-group {
  position: relative;
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

#prompt-input-content {
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
}

#prompt-input-content:empty + #prompt-input-placeholder {
  opacity: 1;
}

#prompt-input-content:focus + #prompt-input-placeholder {
  padding: 0 6px 0px;
}

.selectable-text {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

</style>