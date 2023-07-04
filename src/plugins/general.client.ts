
export default defineNuxtPlugin(nuxtApp => {

  const { darkModeChanged } = useAppSharedStore()
  
  if(!darkModeChanged && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    useAppSharedStore().toggleDarkMode(false)
  }

})