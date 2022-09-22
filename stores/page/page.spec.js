import { setActivePinia, createPinia } from 'pinia'
import { usePageStore, CMS_PAGE, CATEGORY_PAGE, PRODUCT_PAGE } from './page'

jest.mock('~/stores/cms', () => {
  const {
    entries,
  } = require('~/components/molecules/Breadcrumb/Breadcrumb.stories.content')

  return {
    __esModule: true,
    useCmsStore: () => ({ breadcrumb: entries }),
  }
})

jest.mock('~/stores/category', () => {
  const { entries } = require('~/stores/category/category.content')

  return {
    __esModule: true,
    useCategoryStore: () => ({ breadcrumb: entries }),
  }
})

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const pageStore = usePageStore()

      expect(pageStore.pageType).toBe(CMS_PAGE)
      expect(pageStore.setPageType).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should set page type when setPageType is called', async () => {
      const pageStore = usePageStore()

      await pageStore.setPageType(CATEGORY_PAGE)
      expect(pageStore.pageType).toBe(CATEGORY_PAGE)

      await pageStore.setPageType(PRODUCT_PAGE)
      expect(pageStore.pageType).toBe(PRODUCT_PAGE)

      await pageStore.setPageType(CMS_PAGE)
      expect(pageStore.pageType).toBe(CMS_PAGE)
    })
  })

  // describe('business requirements', () => {})
})
