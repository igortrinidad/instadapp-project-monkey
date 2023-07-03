<template>
  <div class="w-full flex flex-col space-y-8 items-start">
    <h1>Home</h1>
    <button class="btn">Click here</button>
    <button class="btn btn-primary btn-xl">Click here</button>

    <div class="w-full h-24 bg-red-200" v-for="t in 10" :key="t">
    </div>
  </div>
</template>

<script setup>


</script>