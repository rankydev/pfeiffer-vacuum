import { useCategoryStore } from '~/stores/category'
import { setActivePinia, createPinia } from 'pinia'
import { entries } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content'
import { test } from '@jest/globals'

const mockQuery = jest.fn()
const mockParams = jest.fn()

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

const mockAxiosRequest = jest.fn((url) => {
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

const mockLocalePath = 'localePath'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        $axios: {
          get: mockAxiosRequest,
        },
        i18n: { locale: 'en', t: (val) => val },
        app: {
          localePath: jest.fn(() => mockLocalePath),
        },
      }
    }),
    useRouter: jest.fn(() => ({ options: { base: '' } })),
    useRoute: jest.fn(() =>
      ref({
        fullPath: '/someExample/',
        params: mockParams(),
        query: mockQuery(),
      })
    ),
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

const rootCat = { href: 'localePath', name: 'category.rootCategory' }

describe('useCategoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockAxiosRequest.mockClear()
    mockParams.mockReturnValue({})
    mockQuery.mockReturnValue({})
  })

  describe('initial state', () => {
    test('should return all expected properties', async () => {
      const categoryStore = await useCategoryStore()

      expect(categoryStore.category).toBe(null)
      expect(categoryStore.result).toBe(null)
      expect(categoryStore.breadcrumb).toStrictEqual([entries[0], rootCat])
      expect(categoryStore.categoryName).toBe(rootCat.name)
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
      mockParams.mockReturnValue({ category: 'ChildCategory' })

      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()
      const path = `${mockLocalePath}/${mockChildCategory.categoryPath[0].id}`

      expect(categoryStore.parentCategoryPath).toBe(path)
    })

    test('should create the breadcrumb given categoryPath array with several categories', async () => {
      mockParams.mockReturnValue({ category: 'ChildCategory' })

      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()

      expect(categoryStore.breadcrumb).toStrictEqual([
        entries[0],
        rootCat,
        ...mockChildCategory.categoryPath.map(({ name, id }) => ({
          name,
          href: `${mockLocalePath}/${id}`,
        })),
      ])
    })

    test('should return if path has been loaded before', async () => {
      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()
      await categoryStore.loadByPath()
      await categoryStore.loadByPath()
      await categoryStore.loadByPath()

      expect(mockAxiosRequest).toBeCalledTimes(2)
    })

    test('should load single category given category id', async () => {
      mockParams.mockReturnValue({ category: 'Category' })

      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()

      expect(categoryStore.category).toStrictEqual(mockExampleCategory)
    })

    test('should add breadcrumb element if search term is present', async () => {
      const query = { searchTerm: 'A200L' }
      mockQuery.mockReturnValue(query)

      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()

      expect(categoryStore.breadcrumb).toStrictEqual([
        entries[0],
        rootCat,
        ...mockRootCategory.categoryPath.map(({ name, id }) => ({
          name,
          href: `${mockLocalePath}/${id}`,
        })),
        {
          href: '',
          name: `category.searchResult "${query.searchTerm}"`,
        },
      ])
    })

    test('should create meta data given a category', async () => {
      const categoryStore = await useCategoryStore()
      await categoryStore.loadByPath()

      expect(categoryStore.metaData).toStrictEqual({
        title: categoryStore.categoryName,
        seoTitle: '',
        seoDescription: '',

        ogTitle: categoryStore.categoryName,
        ogDescription: '',
        ogImage: null,

        twitterTitle: categoryStore.categoryName,
        twitterDescription: '',
        twitterImage: null,
      })
    })
  })
})
