import { defineStore } from 'pinia'
import { promptExample, regexExtractVariablePattern, regexSplitContentKeepingVariablesPattern, regexTestVariable, regexExtractSingleVariable, colors as colorsSource } from '@/src/util/enums'
import { slugifyVariableName } from '@/src/util/functions'
import { encrypt } from '@/src/util/encryptClient'
import { StringHelpers } from '@igortrindade/lazyfy'
interface VariableInterface {
  key: string
  value: string | null
  color: string
}

interface HistoryItemInterface {
  id: string
  prompt: string
  response: string
  createdAt: Date
}

export const useAppHomeStore = defineStore('appHomeStore', {
  
  persist: true,
  
  state: () => ({
    promptContent: promptExample,
    promptTokens: 0,
    promptUSD: 0,
    variables: [] as Array<VariableInterface>,
    history: [] as Array<HistoryItemInterface>,
    openAiApiKey: '',
  }),

  getters: {
    getPromptContent: (state) => {
      return state.promptContent
    },
    getVariablesIncludedInPrompt: (state) => {
      const matches = [...state.promptContent.matchAll(regexExtractVariablePattern)]
      return matches
        .map(match => slugifyVariableName(match[1]))
        .filter((v) => v)
    },

    getVariables: (state) => {
      return state.variables
        .filter((v) => useAppHomeStore().getVariablesIncludedInPrompt.includes(v.key))
    },

    getInputsHasEmptyValue: (state) => {
      return useAppHomeStore().getVariables
        .filter((v) => !v.value).length > 0
    },

    getPrompContentWithVariablesValues: (state) => (hightlightInputValues: boolean) => {
      return state.promptContent
      .split(regexSplitContentKeepingVariablesPattern)
        .map((strSplitted: string) => {
          if (regexTestVariable.test(strSplitted) && strSplitted.match(regexExtractSingleVariable)) {
            const variableName = slugifyVariableName(strSplitted.match(regexExtractSingleVariable)[1])
            const variable = useAppHomeStore().variables.find((v) => v.key === slugifyVariableName(variableName)) as VariableInterface | undefined
            if(!variable) return hightlightInputValues ? 'Variable not found' : ''
            const value = variable.value || `Add a value for ${variableName}`
            return hightlightInputValues ? `<span class="bg-${ variable.color} rounded-md px-2 py-1">${value}</span>` : value
          }
          return strSplitted
        })
        .join('')
    }
  },

  actions: {

    setPromptContent(promptContent: string) {
      this.promptContent = promptContent
    },
    
    setVariables() {
      const matches = [...this.promptContent.matchAll(regexExtractVariablePattern)]
      const variablesFoundedOnContent = matches
        .map(match => match[1])
        .filter((v) => v)
      variablesFoundedOnContent.map((variableFounded) => {
        const variableAlreadyAdded = this.variables.find((v) => v.key === slugifyVariableName(variableFounded))
        if(!variableAlreadyAdded) {
          this.variables.push({ value: null, key: slugifyVariableName(variableFounded), color: colorsSource[this.variables.length] })
        }
      })
    },

    async generateChatGptResponse() {
      const config = useRuntimeConfig()
      const openAiApiKey = await encrypt(useAppHomeStore().openAiApiKey, config.public.ENCRYPTION_KEY)
      const prompt = useAppHomeStore().getPrompContentWithVariablesValues(false)
      try {
        const { data } = await useFetch('/api/chat-gpt/generate', { method: 'POST', body: { prompt, openAiApiKey } })
        this.addPromptHistoryItem({ prompt, response: data.value.response })
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    addPromptHistoryItem(item: { prompt: string, response: string}) {
      this.history.unshift({ ...item, id: StringHelpers.randomString(12), createdAt: new Date() })
    }

  }

})