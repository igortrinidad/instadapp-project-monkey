<template>
  <div class="w-full flex flex-col space-y-8 items-start">
    <h1>Home</h1>
    <!-- <button class="btn">Click here</button>
    <button class="btn btn-primary btn-xl">Click here</button> -->

    <ClientOnly>
      <PromptInput />
    </ClientOnly>

  </div>
</template>

<script setup>

  import PromptInput from '@/src/components/PromptInput.vue'

</script>