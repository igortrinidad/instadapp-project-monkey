<template>
  <div class="w-full flex flex-col items-start space-y-4 p-2">
    <h3 class="text-lg font-bold">Inputs</h3>
    
    <div class="flex flex-col items-start space-y-2" v-for="(variable, index) in variables" :key="variable.key">
      <label class="block rounded-lg px-2 py-1" :class="[`bg-${ colors[index] }`]">{{ `\{\{ ${ variable.key } \}\}` }}</label>
      <input 
        class="input-classes"
        :class="[`focus:ring-${ colors[index] }`]"
        type="text"
        placeholder="Insert the input value"
        v-model="variable.value"
      />
    </div>
  </div>
</template>

<script setup>

  import { colors as colorsSource } from '@/src/util/enums'
  import { storeToRefs } from 'pinia'

  const { variables } = storeToRefs(useAppHomeStore())
  const colors = ref(colorsSource)

</script>

<style lang="scss">

  .input-classes {
    @apply block text-lg py-2 px-3 rounded-lg bg-gray-200/10 border border-gray-400/30 focus:outline focus:ring;
  }

</style>