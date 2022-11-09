import { setActivePinia, createPinia } from 'pinia'
import { usePageStore, CMS_PAGE, CATEGORY_PAGE, PRODUCT_PAGE } from './page'
import { entries } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content'
import { breadcrumb as catBreadcrumb } from '~/stores/category/category.stories.content'
import { breadcrumb as prodBreadcrumb } from '~/stores/product/product.stories.content'

jest.mock('~/stores/cms', () => {
  const {
    entries: breadcrumb,
  } = require('~/components/molecules/Breadcrumb/Breadcrumb.stories.content')

  return {
    __esModule: true,
    useCmsStore: () => ({ breadcrumb }),
  }
})

jest.mock('~/stores/category', () => {
  const { breadcrumb } = require('~/stores/category/category.stories.content')

  return {
    __esModule: true,
    useCategoryStore: () => ({ breadcrumb: breadcrumb }),
  }
})

jest.mock('~/stores/product', () => {
  const { breadcrumb } = require('~/stores/product/product.stories.content')

  return {
    __esModule: true,
    useProductStore: () => ({ breadcrumb: breadcrumb }),
  }
})

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const pageStore = usePageStore()

      expect(pageStore.pageType).toBe(CMS_PAGE)
      expect(pageStore.setPageType).toBeInstanceOf(Function)
      expect(pageStore.breadcrumb).toBe(entries)
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

    test('should initialize category page breadcrumb if page type is set to category page', async () => {
      const pageStore = usePageStore()

      await pageStore.setPageType(CATEGORY_PAGE)
      expect(pageStore.breadcrumb).toBe(catBreadcrumb)
    })

    test('should initialize product page breadcrumb if page type is set to product page', async () => {
      const pageStore = usePageStore()

      await pageStore.setPageType(PRODUCT_PAGE)
      expect(pageStore.breadcrumb).toBe(prodBreadcrumb)
    })
  })

  // describe('business requirements', () => {})
})
