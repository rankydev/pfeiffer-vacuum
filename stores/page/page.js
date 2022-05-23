import { defineStore } from 'pinia'
import { ref, readonly } from '@nuxtjs/composition-api'

export const CMS_PAGE = 'cms'
export const CATEGORY_PAGE = 'category'
export const PRODUCT_PAGE = 'product'

export const usePageStore = defineStore('page', () => {
  const pageType = ref(CMS_PAGE)

  const setPageType = (type) => (pageType.value = type)

  return {
    pageType: readonly(pageType),
    setPageType,
  }
})