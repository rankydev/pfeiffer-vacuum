import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from './product'
import { entries } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content'

const mockLogger = jest.fn()
const mockGet = jest.fn()
const mockQuery = jest.fn()
const mockParams = jest.fn()

const mockProduct = {
  categoryPath: [
    { id: 'category', name: 'Category' },
    { id: 'category2', name: 'Category2' },
  ],
  name: 'Some Product name',
}

const mockedIsApprovedUser = jest.fn().mockReturnValue(false)
const mockedCurrentUser = jest.fn().mockReturnValue(null)
jest.mock('~/stores/user', () => {
  return {
    __esModule: true,
    useUserStore: () => {
      return {
        currentUser: mockedCurrentUser(),
        isApprovedUser: mockedIsApprovedUser(),
      }
    },
  }
})

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: (e) => mockLogger(e),
      },
    }
  },
}))

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return {
      axios: {
        $get: mockGet,
      },
    }
  },
}))

jest.mock('~/stores/cms', () => {
  const {
    entries: breadcrumb,
  } = require('~/components/molecules/Breadcrumb/Breadcrumb.stories.content')

  return {
    __esModule: true,
    useCmsStore: () => ({ breadcrumb }),
  }
})

jest.mock('pinia', () => {
  const originalModule = jest.requireActual('pinia')

  return {
    ...originalModule,
    storeToRefs: (store) => ({ ...store }),
  }
})

const mockLocalePath = 'localePath'
jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    ...originalModule,
    useContext: () => ({
      i18n: { locale: 'en', t: (val) => val },
      localePath: jest.fn(() => mockLocalePath),
    }),
    useRoute: () =>
      ref({
        fullPath: '/someExample/',
        params: mockParams(),
        query: mockQuery(),
      }),
    ssrRef: ref,
  }
})

const rootCat = { href: 'localePath', name: 'category.rootCategory' }

describe('Product store', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setActivePinia(createPinia())
    mockParams.mockReturnValue({})
    mockQuery.mockReturnValue({})
  })

  describe('initial state', () => {
    test('should return all expected properties', async () => {
      const productStore = await useProductStore()

      expect(productStore.product).toBe(null)
      expect(productStore.variationMatrix).toBe(null)
      expect(productStore.price).toBe(null)
      expect(productStore.breadcrumb).toStrictEqual([entries[0], rootCat])
      expect(productStore.metaData).toStrictEqual({
        ogDescription: '',
        ogImage: null,
        ogTitle: '',
        seoDescription: '',
        seoTitle: '',
        title: '',
        twitterDescription: '',
        twitterImage: null,
        twitterTitle: '',
      })
      expect(productStore.loadByPath).toBeInstanceOf(Function)
    })

    test('should return false initial value', async () => {
      const productStore = useProductStore()
      const productData = await productStore.getProducts()

      expect(productStore.getProducts).toBeInstanceOf(Function)
      expect(productData).toStrictEqual([])
    })
  })

  describe('during interaction', () => {
    test('should invoke getProducts and thorw error', async () => {
      mockGet.mockReturnValue(Promise.reject('error'))
      const productStore = useProductStore()
      const productData = await productStore.getProducts([])

      expect(mockLogger).toBeCalledWith('error')
      expect(mockLogger).toBeCalledWith(
        "Array expected when fetching multiple products '', returning empty array."
      )
      expect(productData).toStrictEqual([])
    })

    test('should invoke getProducts correctly', async () => {
      mockGet.mockReturnValue(Promise.resolve({ products: ['Produkt1'] }))
      const productStore = useProductStore()
      const ids = []
      const productData = await productStore.getProducts(ids)

      expect(productStore.getProducts).toBeInstanceOf(Function)
      expect(productData).toStrictEqual(['Produkt1'])
    })

    test('should throw an error if no product id is given', async () => {
      const productStore = await useProductStore()

      try {
        await productStore.loadByPath()
      } catch (e) {
        expect(e).toStrictEqual(new Error('No valid id given in route object.'))
      }
    })

    test('should execute loadByPath correctly for anaonymous user', async () => {
      mockGet.mockImplementation((url) => {
        if (url.endsWith('variationmatrix')) return Promise.resolve({})
        if (url.endsWith('price')) return Promise.resolve({})
        return Promise.resolve(mockProduct)
      })

      mockParams.mockReturnValue({ product: 'someProductId' })

      const productStore = await useProductStore()

      await productStore.loadByPath()
      expect(productStore.product).toStrictEqual(mockProduct)
      expect(productStore.variationMatrix).toStrictEqual({})
      expect(productStore.price).toStrictEqual(null)
    })

    test('should execute loadByPath correctly for loggedIn user which is not approved', async () => {
      mockedIsApprovedUser.mockReturnValue(false)
      mockedCurrentUser.mockReturnValue({ uid: 'someUid' })

      mockGet.mockImplementation((url) => {
        if (url.endsWith('variationmatrix')) return Promise.resolve({})
        if (url.endsWith('price')) return Promise.resolve({})
        return Promise.resolve(mockProduct)
      })

      mockParams.mockReturnValue({ product: 'someProductId' })

      const productStore = await useProductStore()

      await productStore.loadByPath()
      expect(productStore.product).toStrictEqual(mockProduct)
      expect(productStore.variationMatrix).toStrictEqual({})
      expect(productStore.price).toStrictEqual(null)
    })

    test('should execute loadByPath correctly for loggedIn user which is approved', async () => {
      mockedIsApprovedUser.mockReturnValue(true)
      mockedCurrentUser.mockReturnValue({ uid: 'someUid' })

      mockGet.mockImplementation((url) => {
        if (url.endsWith('variationmatrix')) return Promise.resolve({})
        if (url.endsWith('price')) return Promise.resolve({})
        return Promise.resolve(mockProduct)
      })

      mockParams.mockReturnValue({ product: 'someProductId' })

      const productStore = await useProductStore()

      await productStore.loadByPath()
      expect(productStore.product).toStrictEqual(mockProduct)
      expect(productStore.variationMatrix).toStrictEqual({})
      expect(productStore.price).toStrictEqual(null)
    })

    test('should create breadcrumb given a product', async () => {
      mockGet.mockImplementation((url) => {
        if (url.endsWith('variationmatrix')) return Promise.resolve({})
        if (url.endsWith('price')) return Promise.resolve({})
        return Promise.resolve(mockProduct)
      })

      mockParams.mockReturnValue({ product: 'someProductId' })

      const productStore = await useProductStore()

      await productStore.loadByPath()

      expect(productStore.breadcrumb).toStrictEqual([
        entries[0],
        rootCat,
        ...mockProduct.categoryPath.map(({ name, id }) => ({
          name,
          href: `${mockLocalePath}/${id}`,
        })),
        { name: mockProduct.name },
      ])
    })

    test('should return if path has been loaded before', async () => {
      mockGet.mockImplementation((url) => {
        if (url.endsWith('variationmatrix')) return Promise.resolve({})
        if (url.endsWith('price')) return Promise.resolve({})
        return Promise.resolve(mockProduct)
      })
      mockParams.mockReturnValue({ product: 'someProductId' })

      const productStore = await useProductStore()

      await productStore.loadByPath()
      await productStore.loadByPath()
      await productStore.loadByPath()
      await productStore.loadByPath()

      expect(mockGet).toBeCalledTimes(2)
    })
  })
})
