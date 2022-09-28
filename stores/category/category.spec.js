import { useCategoryStore } from '~/stores/category'
import { setActivePinia, createPinia } from 'pinia'
import { entries } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content'
import {
  setCategory,
  useContext,
  getAxiosRequest,
} from '@nuxtjs/composition-api'

const mockRootCategory = {
  categoryPath: [{ id: 'category', name: 'Category' }],
}

const mockExampleCategory = {
  categoryPath: [{ id: 'examplecategory', name: 'ExampleCategory' }],
}

const mockChildCategory = {
  categoryPath: [
    { id: 'category', name: 'Category' },
    { id: 'category2', name: 'Category2' },
  ],
}

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
  let returnCategory = ''
  const axiosRequest = jest.fn((url) => {
    switch (url) {
      case '/api/shop/pfeifferwebservices/v2/pfeiffer/catalogs/pfeifferProductCatalog/Online':
        return Promise.resolve({ data: mockRootCategory })
      case '/api/shop/pfeifferwebservices/v2/pfeiffer/catalogs/pfeifferProductCatalog/Online/categories/Category':
        return Promise.resolve({ data: mockExampleCategory })
      case '/api/shop/pfeifferwebservices/v2/pfeiffer/catalogs/pfeifferProductCatalog/Online/categories/ChildCategory':
        return Promise.resolve({ data: mockChildCategory })
      case '/api/shop/pfeifferwebservices/v2/pfeiffer/products/search':
      default:
        return Promise.resolve({ data: mockSearchResult })
    }
  })

  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        $axios: {
          get: axiosRequest,
        },
        i18n: { locale: 'en' },
        app: {
          localePath: jest.fn(() => mockLocalePath),
        },
      }
    }),
    useRouter: jest.fn(() => ({ options: { base: '' } })),
    useRoute: jest.fn(() =>
      ref({
        fullPath: '/someExample/',
        params: { category: returnCategory },
        query: {},
      })
    ),
    setCategory: (category) => {
      returnCategory = category
    },
    getAxiosRequest: () => axiosRequest,
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
      expect(categoryStore.category).toStrictEqual(mockRootCategory)
      expect(categoryStore.result).toStrictEqual(mockSearchResult)
    })

    test('should initialize parentCategoryPath given categoryPath array with one single category', async () => {
      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()

      expect(categoryStore.parentCategoryPath).toBe(mockLocalePath)
    })

    test('should initialize parentCategoryPath given categoryPath array with several categories', async () => {
      setCategory('ChildCategory')

      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()
      const path = `${mockLocalePath}/${mockChildCategory.categoryPath[0].id}`
      expect(categoryStore.parentCategoryPath).toBe(path)
    })

    test('should create the breadcrumb given categoryPath array with several categories', async () => {
      setCategory('ChildCategory')

      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()
      expect(categoryStore.breadcrumb).toStrictEqual([
        entries[0],
        entries[1],
        ...mockChildCategory.categoryPath.map(({ name, id }) => ({
          name,
          href: `${mockLocalePath}/${id}`,
        })),
      ])
    })

    test('should return if path has been loaded before', async () => {
      const categoryStore = await useCategoryStore()
      const context = useContext()
      const axios = getAxiosRequest()
      axios.mockClear()

      await categoryStore.loadByPath()
      await categoryStore.loadByPath()
      await categoryStore.loadByPath()
      await categoryStore.loadByPath()

      expect(axios).toBeCalledTimes(2)
    })

    test('should load single category given category id', async () => {
      setCategory('Category')

      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()

      expect(categoryStore.category).toStrictEqual(mockExampleCategory)
    })
  })
})
