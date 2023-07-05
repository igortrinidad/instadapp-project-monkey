import { defineStore } from 'pinia'
import { promptExample, regexExtractVariablePattern, regexSplitContentKeepingVariablesPattern, regexTestVariable, regexExtractSingleVariable, colors as colorsSource } from '@/src/util/enums'
import { slugifyVariableName } from '@/src/util/functions'
import { GPTTokens } from 'gpt-tokens'

interface VariableInterface {
  key: string
  value: string | null
  color: string
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
    },

    getPrompContentHighlightingVariables: (state) => {
      return state.promptContent
      .split(regexSplitContentKeepingVariablesPattern)
        .map((strSplitted) => {

          if (regexTestVariable.test(strSplitted) && strSplitted.match(regexExtractSingleVariable)) {
            const variableName = strSplitted.match(regexExtractSingleVariable)[1]
            const variableValue = useAppHomeStore().variables.find((v) => v.key === slugifyVariableName(variableName)) as VariableInterface | undefined
            if(!variableValue) return 'Variable not found'
            const value = variableValue.value || `Add a value for ${variableName}`
            return `<span class="bg-${ variableValue.color} rounded-md px-2 py-1">${value}</span>`
          }
          return strSplitted
        })
        .join('')
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
        .map((v, index) => ({ value: null, key: slugifyVariableName(v), color: colorsSource[index] }) )
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