<template>
  <div class="default-navbar">

    <div class="flex space-x-2">
      <img src="/mkt/logo_LOGO.svg" class="h-8" alt="PromptMonkey logo" />
      <img src="/mkt/logo_NAME.svg" class="h-8" alt="PromptMonkey logo" />
    </div>

    <button class="btn-default">Login</button>
  </div>
</template>

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
    ;
}
</style>