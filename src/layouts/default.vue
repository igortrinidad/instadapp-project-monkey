<template>
  <div class="w-full flex flex-col space-y-8">
    <NavBar />
    <div class="h-16">
    </div>
    <slot />
  </div>
</template>

<script setup>

import NavBar from '@/src/layouts/default-components/NavBar.vue'

</script>
