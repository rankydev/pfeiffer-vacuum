import { useCategoryStore } from '~/stores/category'
import { setActivePinia, createPinia } from 'pinia'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    useContext: jest.fn(() => {
      return {
        $axios: {},
        i18n: {},
        app: {},
      }
    }),
    useRouter: jest.fn(() => {
      return { options: { base: '' } }
    }),
    useRoute: jest.fn(() => {
      return {}
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

describe('useCategoryStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  test('should return category', async () => {
    const categoryStore = await useCategoryStore()
  })
})
