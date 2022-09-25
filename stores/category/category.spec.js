import { useCategoryStore } from '~/stores/category'
import { setActivePinia, createPinia } from 'pinia'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    useContext: jest.fn(() => {
      return {
        $axios: {
          get: jest.fn(() => {
            return { then: jest.fn() }
          }),
        },
        i18n: {},
        app: {},
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
        },
      }
    }),
    ssrRef: ref,
    useAsync: jest.fn(() => {
      return {}
    }),
    unref: jest.fn(() => {
      return {}
    }),
    computed: jest.fn(() => {
      return {}
    }),
    ref: jest.fn(() => {
      return {}
    }),
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

      expect(categoryStore.category).toStrictEqual({})
      expect(categoryStore.result).toStrictEqual({})
      expect(categoryStore.loadByPath).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should execute loadByPath method correctly', async () => {
      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()
    })
  })
})
