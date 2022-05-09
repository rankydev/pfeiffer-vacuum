import { setActivePinia, createPinia } from 'pinia'
import { usePageStore, CMS_PAGE, CATEGORY_PAGE, PRODUCT_PAGE } from './page'

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expeted properties', () => {
      const pageStore = usePageStore()

      expect(pageStore.pageType).toBe(CMS_PAGE)
      expect(pageStore.language).toBe('de')
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
