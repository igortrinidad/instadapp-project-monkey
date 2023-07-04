import { defineStore } from 'pinia'

export const useAppSharedStore = defineStore('appSharedStore', {
  
  persist: true,
  
  state: () => ({
    isTransitioning: false,
    darkMode: false,
    darkModeChanged: false,
    lastTransitionDirection: 'left',
  }),

  actions: {

    toggleDarkMode(darkModeChanged: boolean = true) {
      this.darkMode = !this.darkMode
      this.darkModeChanged = darkModeChanged
    },

    setIsTransitioning(isTransitioning: boolean) {
      this.isTransitioning = isTransitioning
    }

  }

})