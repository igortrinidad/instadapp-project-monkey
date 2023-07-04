<template>
  <button 
    class="w-14 h-6 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
    @click="toggle()"
  >
    <div
      :class="{
        'bg-gray-700 translate-x-full': value,
        'bg-yellow-500 -translate-x-2': !value,
      }"
      class="w-8 h-8 relative rounded-full transition duration-500 transform p-1 text-white flex items-center justify-center"
    >
      <slot />
    </div>
  </button>

</template>


<script setup>

  const { emit } = getCurrentInstance()

  defineEmits(['update:value', 'change'])

  const props = defineProps({
    value: Boolean,
  })

  const toggle = () => {
    emit('update:value', Boolean(!props.value))
    emit('change', Boolean(!props.value))
  }

</script>