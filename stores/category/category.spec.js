import { useCategoryStore } from '~/stores/category'
import { setActivePinia, createPinia } from 'pinia'
import { entries } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content'
import { createTestingPinia } from '@pinia/testing'

const mockSingleCategory = { categoryPath: ['Category'] }
const mockCategories = { categoryPath: ['Category', 'Category2'] }
const mockSearchResult = {
  type: 'productCategorySearchPageWsDTO',
  categorySubtree: [],
  facets: [],
  products: [],
}
const mockLocalePath = 'localePath'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        $axios: {
          get: jest.fn((url) => {
            switch (url) {
              case '/api/shop/pfeifferwebservices/v2/pfeiffer/catalogs/pfeifferProductCatalog/Online':
                return {
                  then: jest.fn(() => {
                    return mockSingleCategory
                  }),
                }
              case '/api/shop/pfeifferwebservices/v2/pfeiffer/products/search':
                return {
                  then: jest.fn(() => {
                    return mockSearchResult
                  }),
                }
                break
            }
          }),
        },
        i18n: { locale: 'en' },
        app: {
          localePath: jest.fn(() => {
            return mockLocalePath
          }),
        },
      }
    }),
    useRouter: jest.fn(() => {
      return { options: { base: '' } }
    }),
    useRoute: jest.fn(() => {
      return {
        value: {
          fullPath: '',
          params: { category: '' },
          query: {},
        },
      }
    }),
    ssrRef: ref,
  }
})

jest.mock('~/stores/cms', () => {
  const {
    entries,
  } = require('~/components/molecules/Breadcrumb/Breadcrumb.stories.content')

  return {
    __esModule: true,
    useCmsStore: () => ({ breadcrumb: entries }),
  }
})

describe('useCategoryStore', () => {
  beforeEach(() => setActivePinia(createPinia()))
  describe('initial state', () => {
    test('should return all expected properties', async () => {
      const categoryStore = await useCategoryStore()

      expect(categoryStore.category).toBe(null)
      expect(categoryStore.result).toBe(null)
      expect(categoryStore.breadcrumb).toStrictEqual([entries[0], entries[1]])
      expect(categoryStore.categoryName).toBe(entries[1].name)
      expect(categoryStore.parentCategoryPath).toBe(null)
      expect(categoryStore.loadByPath).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should execute loadByPath correctly', async () => {
      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()
      expect(categoryStore.category).toStrictEqual(mockSingleCategory)
      expect(categoryStore.result).toStrictEqual(mockSearchResult)
    })

    test('should initialize parentCategoryPath given categoryPath array with one single category', async () => {
      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()

      expect(categoryStore.parentCategoryPath).toBe(mockLocalePath)
    })

    test('should initialize parentCategoryPath given categoryPath array with several categories', async () => {
      const pinia = createTestingPinia({
        initialState: {
          category: {
            category: { ...mockCategories },
          },
        },
      })
      const categoryStore = await useCategoryStore(pinia)

      expect(categoryStore.parentCategoryPath).toBe(mockLocalePath)
    })

    test('should return if path has been loaded before', async () => {
      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()
      await categoryStore.loadByPath()

      // expect loadCategory and loadProducts to be called only one time
    })

    test('should load single category given category id', async () => {
      const pinia = createTestingPinia({
        initialState: {
          route: {
            value: {
              fullPath: '',
              params: { category: 'Category' },
              query: {},
            },
          },
        },
        stubActions: false,
      })

      const categoryStore = await useCategoryStore(pinia)
      await categoryStore.loadByPath()
    })
  })
})
