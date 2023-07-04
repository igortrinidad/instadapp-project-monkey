import { defineStore } from 'pinia'
import { promptExample, regexExtractVariablePattern } from '@/src/util/enums'
import { slugifyVariableName } from '@/src/util/functions'
import { GPTTokens } from 'gpt-tokens'

interface VariableInterface {
  key: string
  value: string | null
}

export const useAppHomeStore = defineStore('appHomeStore', {
  
  persist: true,
  
  state: () => ({
    promptContent: promptExample,
    promptTokens: 0,
    promptUSD: 0,
    variables: [] as Array<VariableInterface>,
    history: []
  }),

  getters: {
    getPromptContent: (state) => {
      useAppHomeStore().setVariables()
      return state.promptContent
    }
  },

  actions: {

    setPromptContent(promptContent: string) {
      this.promptContent = promptContent
      this.setVariables()
    },
    
    setVariables() {
      const matches = [...this.promptContent.matchAll(regexExtractVariablePattern)]
      this.variables = matches
        .map(match => match[1])
        .map((v) => ({ value: null, key: slugifyVariableName(v) }) )
        .filter((v) => v.key)
    },

    calculateTokens() {

      const gptTokens = new GPTTokens({
        model   : 'gpt-3.5-turbo',
        messages: [
          { 'role': 'user', 'content': this.promptContent },
        ],
      })
  
      this.promptTokens = gptTokens.usedTokens
      this.promptUSD = gptTokens.usedUSD
    }

  }

})