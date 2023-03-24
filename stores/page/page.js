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
    return cmsStore.breadcrumb
  })

  // page content handling
  const pageContent = ref(null)
  const pageConfigurationContent = ref(null)
  const setPageConfigurationContent = (content) => {
    pageConfigurationContent.value = content
  }
  const setPageContent = (content) => {
    pageContent.value = content
  }

  // forked from useTemplating for now
  const getTemplateContentByName = (name) => {
    return pageConfigurationContent?.value?.[name]
  }

  const getCustomContentByName = (name) => {
    const customContent = pageContent.value?.[name]
    const hasCustomContent = customContent?.length > 0

    return hasCustomContent && customContent
  }

  const getContentByName = (name) => {
    const templateContent = getTemplateContentByName(name)
    const customContent = getCustomContentByName(name)

    return customContent || templateContent
  }

  const mergedPageContent = computed(() => {
    return {
      quicklinks: getContentByName('quicklinks'),
      stage: getContentByName('stage'),
      body: getContentByName('body'),
      bottom: getContentByName('bottom'),
      footer: getContentByName('footer'),
      stickyBar: getContentByName('stickyBar'),
    }
  })

  return {
    pageType: readonly(pageType),
    breadcrumb,
    pageContent,
    pageConfigurationContent,
    mergedPageContent,
    setPageType,
    setPageConfigurationContent,
    setPageContent,
  }
})
