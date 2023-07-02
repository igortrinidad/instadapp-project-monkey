import { defineStore } from 'pinia'

export const useAppSharedStore = defineStore('appSharedStore', {
  
  persist: true,
  
  state: () => ({
    isTransitioning: false,
    darkMode: false,
    tvMode: false,
    lastTransitionDirection: 'left',
  }),

  actions: {

    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },

    toggleTvMode() {
      this.tvMode = !this.tvMode
    },

    setIsTransitioning(isTransitioning: boolean) {
      this.isTransitioning = isTransitioning
    }

  }

})