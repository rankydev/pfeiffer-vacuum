import { defineStore } from 'pinia'
import getLoggerFor from '~/utils/getLoggerFor'

const logger = getLoggerFor('cartStore')

export const useCartStore = defineStore('cart', {
  state: () => ({
    currentCart: null,
    cartOverlayVisible: false,
    cartOverlayInactiveError: false,
  }),

  actions: {
    async loadCurrentCart(forceCreate) {
      const { $hybrisApi } = this.$nuxt
      const result = await $hybrisApi.cartApi.getOrCreateCart(forceCreate)

      if (result) {
        this.currentCart = result
      }
    },
    async mergeAndLoadCarts(anonymousCartGuid) {
      let currentCart = await $hybrisApi.cartApi.getOrCreateCart(false)

      logger.trace('currentCart: ', currentCart)
      logger.trace('anonymousCartGuid: ', anonymousCartGuid)

      if (anonymousCartGuid && anonymousCartGuid !== currentCart?.guid) {
        const mergedCart = await $hybrisApi.cartApi.mergeCarts(
          anonymousCartGuid,
          currentCart
        )
        if (mergedCart) {
          currentCart = mergedCart
        }
      }

      if (currentCart) {
        this.currentCart = currentCart
      }
    },

    async addToCart({ code, quantity }) {
      const { $hybrisApi, $i18n, $globalMessages } = this.$nuxt

      const result = await $hybrisApi.cartApi.addToCart(code, quantity)

      if (result) {
        this.setCartOverlayVisible({
          visible: true,
          inactiveProduct: false,
        })
      } else {
        // TODO what should we do here?
        $globalMessages.error($i18n.t('cart.couldNotAdd'))
      }
    },

    // TODO: Refactor with globalmessage refactoring
    setCartOverlayVisible(options) {
      this.cartOverlayVisible = !!options?.visible
      this.cartOverlayInactiveError = !!options?.inactiveProduct
    },
  },
})
