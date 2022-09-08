import { defineStore } from 'pinia'

// help-obj for default-values of all shoppingList-settings
// Default objects should only hold values since otherwise clone/copying or changes on default objects may occur.
const defaultShoppingListSettings = () => ({
  lists: [],
  isOverlayVisible: false,
  cartToList: false,
  lastProduct: null,
  lastProductQuantity: 1,
})

export const useShoppingListStore = defineStore('shoppingList', {
  state: () => ({
    shoppingListSettings: defaultShoppingListSettings(),
  }),

  getters: {
    getShoppingListSettings(state) {
      return Object.keys(state.shoppingListSettings || {}).length > 0
        ? state.shoppingListSettings
        : defaultShoppingListSettings()
    },
    shoppingLists(state) {
      return state.shoppingListSettings?.lists || []
    },
    shoppingListIsOverlayVisible(state) {
      return (
        state.shoppingListSettings?.isOverlayVisible ||
        defaultShoppingListSettings().isOverlayVisible
      )
    },
    shoppingListCartToList(state) {
      return (
        state.shoppingListSettings?.cartToList ||
        defaultShoppingListSettings().cartToList
      )
    },
    shoppingListLastProduct(state) {
      return (
        state.shoppingListSettings?.lastProduct ||
        defaultShoppingListSettings().lastProduct
      )
    },
    shoppingListLastProductQuantity(state) {
      return (
        state.shoppingListSettings?.lastProductQuantity ||
        defaultShoppingListSettings().lastProductQuantity
      )
    },
  },

  actions: {
    async addToList() {
      const { $hybrisApi, $i18n, $globalMessages } = $nuxt
      const result = await $hybrisApi.shoppingListApi.getShoppingLists()
      if (result) {
        this.shoppingListSettings.lists = result
        this.shoppingListSettings.isOverlayVisible = true
      } else {
        // TODO we don't have globalmessages yet
        $globalMessages.error($i18n.t('list.couldNotLoad'))
      }
    },
    async createShoppingList() {
      this.shoppingListSettings.isOverlayVisible = true
    },
    setShoppingSettings(settings) {
      this.shoppingListSettings = settings || defaultShoppingListSettings()
    },
    // TODO can be done with this.$reset() if this is an own store
    resetShoppingList() {
      this.shoppingListSettings = defaultShoppingListSettings()
    },
  },
})
