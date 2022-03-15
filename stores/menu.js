import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const internalActive = ref(false)
const hasResizeListener = false
let target = null

export const useMenuStore = defineStore('menu', {
  getters: {
    isActive(state) {
      return internalActive.value
    },
  },
  someMethod() {},
  actions: {
    async open(ele) {
      target = ele || null

      if (internalActive.value) return

      internalActive.value = true
      setTimeout(() => {
        addEventListener('click', this.close)
      }, 0)

      if (hasResizeListener) return

      addEventListener('resize', this.close, { passive: true })
    },
    close(event) {
      if (target && event?.target) {
        if (target.contains(event.target)) return
      }

      if (!internalActive.value) return

      internalActive.value = false
      removeEventListener('click', this.close)
    },
  },
})
