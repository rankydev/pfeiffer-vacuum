import { defineStore } from 'pinia'
import { ref, readonly } from '@nuxtjs/composition-api'

export const CMS_PAGE = 'cms'
export const CATEGORY_PAGE = 'category'
export const PRODUCT_PAGE = 'product'

export const usePageStore = defineStore('page', () => {
  const pageType = ref(CMS_PAGE)
  //TODO: receive the language dynamically
  const language = ref('de')

  const setPageType = (type) => (pageType.value = type)

  setTimeout(() => (language.value = 'en'), 3000)

  return {
    pageType: readonly(pageType),
    language,
    setPageType,
  }
})
