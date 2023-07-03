<template>
  <div class="w-screen">
    <NavBar />
    <div class="w-full flex justify-center">
      <div class="container-class">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

import NavBar from '@/src/layouts/default-components/NavBar.vue'

</script>

<style lang="scss">
  .container-class {
    @apply flex w-screen h-auto min-h-[100vh] max-h-none max-w-[1040px] p-4 mb-32;
  }
</style>

