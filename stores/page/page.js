import { defineStore } from 'pinia'
import { ref, readonly, computed } from '@nuxtjs/composition-api'
import { useCmsStore } from '~/stores/cms'
import { useCategoryStore } from '~/stores/category'
import { useProductStore } from '~/stores/product'

export const CMS_PAGE = 'cms'
export const CATEGORY_PAGE = 'category'
export const PRODUCT_PAGE = 'product'

export const usePageStore = defineStore('page', () => {
  const categoryStore = useCategoryStore()
  const productStore = useProductStore()
  const cmsStore = useCmsStore()

  const pageType = ref(CMS_PAGE)

  const setPageType = (type) => (pageType.value = type)

  const breadcrumb = computed(() => {
    if (pageType.value === CATEGORY_PAGE) {
      return categoryStore.breadcrumb
    } else if (pageType.value === PRODUCT_PAGE) {
      return productStore.breadcrumb
    }
    {
      return cmsStore.breadcrumb
    }
  })

  return {
    pageType: readonly(pageType),
    breadcrumb,
    setPageType,
  }
})
