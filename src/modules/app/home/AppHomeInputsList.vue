<template>
  <div class="w-full flex flex-col items-start space-y-4 p-2">
    <h3 class="text-lg font-bold">Inputs</h3>

    <div class="flex flex-col items-start space-y-2" v-for="(variable) in getVariables" :key="variable.key">
      <label class="block rounded-lg px-2 py-1" :class="[`bg-${ variable.color }`]">{{ `\{\{ ${ variable.key } \}\}` }}</label>
      <input 
        class="input-classes"
        :class="[`focus:ring-${ variable.color }`]"
        type="text"
        placeholder="Insert the input value"
        v-model="variable.value"
      />
    </div>
  </div>
</template>

<script setup>

  import { storeToRefs } from 'pinia'

  const { getVariables } = storeToRefs(useAppHomeStore())

</script>

<style lang="scss">

  .input-classes {
    @apply block text-lg py-2 px-3 rounded-lg bg-gray-200/10 border border-gray-400/30 focus:outline focus:ring;
  }

</style>