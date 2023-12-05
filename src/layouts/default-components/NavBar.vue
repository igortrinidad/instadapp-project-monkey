<template>
  <div class="default-navbar">

    <div class="flex space-x-2">
      <img src="/mkt/logo_LOGO.svg" class="h-8" alt="PromptMonkey logo" />
      <img src="/mkt/logo_NAME.svg" class="h-8" alt="PromptMonkey logo" />
    </div>

    <div class="flex space-x-4 items-center">
      <NuxtLink to="https://github.com/igortrinidad/project-monkey-prompt-generator" target="_blank">
        <Icon name="mdi:github" class="text-2xl" />
      </NuxtLink>
      <ClientOnly>
        <Switch :value="darkMode" @change="toggleDarkMode()">
          <Icon v-if="!darkMode" name="material-symbols:wb-sunny-rounded" class="text-xl" />
          <Icon v-else name="material-symbols:nightlight-rounded" class="text-xl" />
        </Switch>
      </ClientOnly>
      <!-- <button class="btn-default">Login</button> -->
    </div>
  </div>
</template>

<script setup>

  import Switch from '@/src/components/Switch.vue'
  import { storeToRefs } from 'pinia'

  const { darkMode } = storeToRefs(useAppSharedStore())

  const toggleDarkMode = () => {
    useAppSharedStore().toggleDarkMode()
  }

</script>
<style lang="scss">
  .default-navbar {
    @apply
      sticky
      top-0
      z-40
      w-full
      backdrop-blur
      transition-colors
      duration-500
      lg:z-50
      lg:border-slate-900/10
      dark:border-slate-50/[0.06]
      bg-white/40
      dark:bg-transparent
      flex justify-between
      p-4
      px-6
    ;
}
</style>