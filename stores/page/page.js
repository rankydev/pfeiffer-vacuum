import { defineStore } from 'pinia'
import { ref, readonly, computed } from '@nuxtjs/composition-api'
import { useCmsStore } from '~/stores/cms'
import { useCategoryStore } from '~/stores/category'

export const CMS_PAGE = 'cms'
export const CATEGORY_PAGE = 'category'
export const PRODUCT_PAGE = 'product'

export const usePageStore = defineStore('page', () => {
  const categoryStore = useCategoryStore()
  const cmsStore = useCmsStore()

  const pageType = ref(CMS_PAGE)

  const setPageType = (type) => (pageType.value = type)

  const breadcrumb = computed(() => {
    if (pageType.value === CATEGORY_PAGE) {
      return categoryStore.breadcrumb
    } else {
      return cmsStore.breadcrumb
    }
  })

  return {
    pageType: readonly(pageType),
    breadcrumb,
    setPageType,
  }
})
