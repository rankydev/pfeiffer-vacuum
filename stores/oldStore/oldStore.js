import { defineStore } from 'pinia'
const cookieHelper = require('~/plugins/cookieHelper')
import getLoggerFor from '~/utils/getLoggerFor'

const logger = getLoggerFor('oldStore')

const DEFAULT_PAGE_SIZE = 9

// help-obj for default-values of all shoppingList-settings
// Default objects should only hold values since otherwise clone/copying or changes on default objects may occur.
const defaultShoppingListSettings = () => ({
  lists: [],
  isOverlayVisible: false,
  cartToList: false,
  lastProduct: null,
  lastProductQuantity: 1,
})

const defaultVsmUser = () => ({
  registered: false,
  userId: null,
  token: null,
})

// TODO this is just to convert the old store to pinia, should be refactored to seperate stores later
export const useOldStore = defineStore('oldStore', {
  state: () => ({
    auth: null,
    isLoginProcess: false,

    isOciPage: false,
    hookUrl: '',
    returnTarget: '_self',
    hiddenUIElements: {},
    customerId: '',

    currentUser: null,

    currentCart: null,
    cartOverlayVisible: false,
    cartOverlayInactiveError: false,

    vsmUser: defaultVsmUser(),

    // shoppingListSettings: defaultShoppingListSettings(),
  }),

  getters: {
    mainNav(state) {
      // eslint-disable-next-line camelcase
      return state.settings?.main_navi || null
    },
    footerLight(state) {
      // eslint-disable-next-line camelcase
      return state.settings?.footer_light || null
    },
    sidebar(state) {
      return state.settings?.sidebar || null
    },
    currentLanguage(state) {
      return state.language
    },
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
      // eslint-disable-next-line camelcase
      return !!state.auth?.access_token
    },
    // getShoppingListSettings(state) {
    //   return Object.keys(state.shoppingListSettings || {}).length > 0
    //     ? state.shoppingListSettings
    //     : defaultShoppingListSettings()
    // },
    // shoppingLists(state) {
    //   return state.shoppingListSettings?.lists || []
    // },
    // shoppingListIsOverlayVisible(state) {
    //   return (
    //     state.shoppingListSettings?.isOverlayVisible ||
    //     defaultShoppingListSettings().isOverlayVisible
    //   )
    // },
    // shoppingListCartToList(state) {
    //   return (
    //     state.shoppingListSettings?.cartToList ||
    //     defaultShoppingListSettings().cartToList
    //   )
    // },
    // shoppingListLastProduct(state) {
    //   return (
    //     state.shoppingListSettings?.lastProduct ||
    //     defaultShoppingListSettings().lastProduct
    //   )
    // },
    // shoppingListLastProductQuantity(state) {
    //   return (
    //     state.shoppingListSettings?.lastProductQuantity ||
    //     defaultShoppingListSettings().lastProductQuantity
    //   )
    // },
  },

  actions: {
    async loadSettings(storyCtx) {
      const result = await this.$cmsApi.getSettings(storyCtx)
      this.settings = result

      // TODO
      this.dispatch('datasources/loadFiles')
    },
    async loadCurrentUser() {
      console.log('### load user')
      if (!this.loggedIn) {
        console.log('### not logged in')
        return
      }
      const { $hybrisApi } = this.$nuxt
      const user = await $hybrisApi.userApi.getUserData()
      if (user && !user.error) {
        console.log('### we got a user', user)
        this.currentUser = user
      } else {
        logger.error('user not found', user || '')
      }
    },
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
    async loadCountries() {
      const { $hybrisApi } = this.$nuxt
      const result = await $hybrisApi.countriesApi.getCountries()

      this.countries = result
    },
    async nuxtServerInit() {
      logger.debug('nuxtServerInit')
      // TODO huh?
      // await this.dispatch('breadcrumbs/init')

      const ctx = this.$nuxt

      const cartCookie = JSON.parse(cookieHelper.getCookie(ctx, 'cart', null))
      if (cartCookie) {
        this.currentCart = cartCookie
      }

      cookieHelper.removeCookie(ctx, 'auth')

      // eslint-disable-next-line camelcase
      const authFromCookie = {
        access_token: cookieHelper.getCookie(ctx, 'auth.accessToken'),
        refresh_token: cookieHelper.getCookie(ctx, 'auth.refreshToken'),
        id_token: cookieHelper.getCookie(ctx, 'auth.idToken'),
        validUntil: cookieHelper.getCookie(ctx, 'auth.validUntil'),
        token_type: cookieHelper.getCookie(ctx, 'auth.tokenType'),
      }

      if (authFromCookie.access_token) {
        logger.debug('Token from cookie')
        logger.trace(authFromCookie)
        this.setAuth(authFromCookie)
      } else {
        logger.debug('Error when loading cookies', authFromCookie)
        this.setAuth(null)
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
    // async addToList() {
    //   const { $hybrisApi, $i18n, $globalMessages } = this.$nuxt

    //   const result = await $hybrisApi.shoppingListApi.getShoppingLists()

    //   if (result) {
    //     this.shoppingListSettings.lists = result
    //     this.shoppingListSettings.isOverlayVisible = true
    //   } else {
    //     $globalMessages.error($i18n.t('list.couldNotLoad'))
    //   }
    // },
    // async createShoppingList() {
    //   this.shoppingListSettings.isOverlayVisible = true
    // },
    async pushToDataLayer(data) {
      // check for window-obj and dataLayer and push only if those are available
      if (window && window.dataLayer) {
        logger.debug('current-data: ', data)
        window.dataLayer.push(data)
      }
    },
    setLanguage(language) {
      this.language = this.app.$i18nHelper.getSafeLocale(language)
    },
    setCurrency(currency) {
      this.currency = this.app.$i18nHelper.getSafeCurrency(currency)
    },
    setAuth(auth) {
      this.auth = auth
      if (!auth) {
        this.currentUser = null
        this.currentCart = null
        this.vsmUser = defaultVsmUser()
      }
    },
    // TODO: Refactor with globalmessage refactoring
    setCartOverlayVisible(options) {
      this.cartOverlayVisible = !!options?.visible
      this.cartOverlayInactiveError = !!options?.inactiveProduct
    },
    setReturnTarget(target) {
      this.returnTarget = target || '_self'
    },
    // setShoppingSettings(settings) {
    //   this.shoppingListSettings = settings || defaultShoppingListSettings()
    // },
    // // TODO can be done with this.$reset() if this is an own store
    // resetShoppingList() {
    //   this.shoppingListSettings = defaultShoppingListSettings()
    // },
    setVsmUser(vsmUser) {
      this.vsmUser = vsmUser || defaultVsmUser()
    },
  },
})
