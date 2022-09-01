import { defineStore } from 'pinia'
import getLoggerFor from '~/utils/getLoggerFor'
import { useCartStore } from '~/stores/cart'
import { useVsmStore } from '~/stores/vsm'

const logger = getLoggerFor('authStore')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: null,
    isLoginProcess: false,
    currentUser: null,
  }),

  getters: {
    isOciUser(state) {
      return state.auth?.type === 'oci'
    },
    isOpenUser(state) {
      return state.currentUser?.registrationStatus?.code === 'OPEN'
    },
    isLeadUser(state) {
      return state.currentUser?.registrationStatus?.code === 'LEAD'
    },
    isRejectedUser(state) {
      return state.currentUser?.registrationStatus?.code === 'REJECTED'
    },
    isApprovedUser(state) {
      return state.currentUser?.registrationStatus?.code === 'APPROVED'
    },
    loggedIn(state) {
      return !!state.auth?.access_token
    },
  },

  actions: {
    async loadCurrentUser() {
      if (!this.loggedIn) {
        return
      }
      const { $hybrisApi } = this.$nuxt
      const user = await $hybrisApi.userApi.getUserData()
      if (user && !user.error) {
        this.currentUser = user
      } else {
        logger.error('user not found', user || '')
      }
    },

    setAuth(auth) {
      const cartStore = useCartStore()
      const vsmStore = useVsmStore()

      this.auth = auth

      //load currentUser data if currentUser obj is empty
      if (auth && !this.currentUser) {
        this.loadCurrentUser()
      }

      if (!auth) {
        this.currentUser = null
        cartStore.currentCart = null
        vsmStore.resetVsmUser()
      }
    },
  },
})
