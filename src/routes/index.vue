<template>
  <div class="w-full flex flex-col space-y-8 items-start">
    <h1>Home</h1>
    <button class="btn-default">Click here</button>
    <button class="btn-default btn-primary">Click here</button>

    <div class="w-full h-24 border" v-for="t in 10" :key="t">
    </div>
  </div>
</template>

<script setup>


</script>