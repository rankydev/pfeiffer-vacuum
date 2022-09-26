import { useCategoryStore } from '~/stores/category'
import { setActivePinia, createPinia } from 'pinia'
import { entries } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        $axios: {
          get: jest.fn(() => {
            return {
              then: jest.fn(() => {
                return 'Test'
              }),
            }
          }),
        },
        i18n: { locale: 'en' },
        app: {
          localePath: jest.fn((input) => {
            return ''
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
      expect(categoryStore.category).toBe('Test')
      expect(categoryStore.result).toBe('Test')
    })

    test('should return ... given categoryPath', async () => {
      const categoryStore = await useCategoryStore()

      await categoryStore.loadByPath()

      expect(categoryStore.parentCategoryPath).toBe(null)
    })
  })
})
