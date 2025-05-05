// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    token: null,
    userName: null,
  }),
  getters: {
    isLogined: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserName(name) {
      this.userName = name;
    }

  },
  persist: {
    storage: sessionStorage,
  },
})
