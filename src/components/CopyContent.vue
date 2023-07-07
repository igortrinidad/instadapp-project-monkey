<template>
  <button class="btn" @click="copyToClipboard">
    <Icon name="material-symbols:content-copy-outline-rounded"></Icon>
  </button>
</template>
<script setup>

  import { CommonHelpers } from '@igortrindade/lazyfy'

  const props = defineProps({
    content: {
      type: String,
    }
  })
  
  const copyToClipboard = () => {
    CommonHelpers.copyToClipboard(props.content)
  }

</script>