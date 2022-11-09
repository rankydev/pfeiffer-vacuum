import { setActivePinia, createPinia } from 'pinia'
import { useCmsStore } from './cms'
import { cmsLinks } from './cms.stories.content.js'
import { useRoute, ref } from '@nuxtjs/composition-api'

jest.mock('@nuxtjs/composition-api', () => {
  const { cmsLinks: cmsLinksArr } = require('./cms.stories.content.js')
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref: orgRef } = originalModule

  const key = '' + Math.random()
  const getLinks = jest
    .fn()
    .mockReturnValueOnce(null) // return empty object
    .mockReturnValueOnce({}) // return empty object
    .mockReturnValueOnce(
      new Promise(() => {
        /*empty function*/
      })
    ) // unresolved promise
    .mockReturnValue(Promise.resolve(cmsLinksArr)) // normal behaviour

  return {
    __esModule: true,
    ...originalModule,
    useContext: jest.fn(() => ({ $cms: { getLinks } })),
    useRoute: jest.fn(),
    ssrRef: orgRef,
    useAsync: (cb) => originalModule.useAsync(cb, key),
  }
})

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return empty breadcrumb if cms return null', async () => {
      useRoute.mockImplementation(() =>
        ref({ path: '/germany/en/test/de-test' })
      )
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      expect(pageStore.cmsLinks).toEqual([])
      expect(pageStore.breadcrumb).toEqual([])
    })

    test('should return empty breadcrumb if cms return empty object', async () => {
      useRoute.mockImplementation(() =>
        ref({ path: '/germany/en/test/de-test' })
      )
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      expect(pageStore.cmsLinks).toEqual([])
      expect(pageStore.breadcrumb).toEqual([])
    })

    test('should return empty breadcrumb if cms request is pending', async () => {
      useRoute.mockImplementation(() =>
        ref({ path: '/germany/en/test/de-test' })
      )
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      expect(pageStore.cmsLinks).toEqual(null)
      expect(pageStore.breadcrumb).toEqual([])
    })

    test('should return breadcrumb if cms request resolves', async () => {
      useRoute.mockImplementation(() =>
        ref({ path: '/germany/en/test/de-test' })
      )
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      const expectedBreadcrumbResult = [
        { href: '/germany/en', name: 'Home' },
        { href: '/germany/en/test', name: 'Test Home' },
        { href: '/germany/en/test/de-test', name: 'DE Test' },
      ]

      expect(pageStore.cmsLinks).toEqual(cmsLinks)
      expect(pageStore.breadcrumb).toEqual(expectedBreadcrumbResult)
    })

    test('should return german breadcrumb if cms request resolves', async () => {
      useRoute.mockImplementation(() =>
        ref({ path: '/germany/de/test/de-test' })
      )
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      const expectedBreadcrumbResult = [
        { href: '/germany/de', name: 'Home' },
        { href: '/germany/de/test', name: 'Test Home' },
        { href: '/germany/de/test/de-test', name: 'Translated Label' },
      ]

      expect(pageStore.cmsLinks).toEqual(cmsLinks)
      expect(pageStore.breadcrumb).toEqual(expectedBreadcrumbResult)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
