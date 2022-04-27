import { setActivePinia, createPinia } from 'pinia'
import { useCmsStore } from './cms'
import { cmsLinks, breadcrumbResult } from './cms.stories.content.js'

jest.mock('@nuxtjs/composition-api', () => {
  const { cmsLinks, path } = require('./cms.stories.content.js')
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  const result = { data: { links: cmsLinks } }
  const key = '' + Math.random()
  const query = jest
    .fn()
    .mockReturnValueOnce({}) // return empty object
    .mockReturnValueOnce(new Promise(() => {})) // unresolved promise
    .mockReturnValue(Promise.resolve(result)) // normal behaviour

  return {
    __esModule: true,
    ...originalModule,
    useContext: jest.fn(() => ({ $cms: { query } })),
    useRoute: jest.fn(() => ref({ path })),
    useAsync: (cb) => originalModule.useAsync(cb, key),
  }
})

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return empty breadcrumb if cms return empty object', async () => {
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      expect(pageStore.cmsLinks).toEqual([])
      expect(pageStore.breadcrumb).toEqual([])
    })

    test('should return empty breadcrumb if cms request is pending', async () => {
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      expect(pageStore.cmsLinks).toEqual(null)
      expect(pageStore.breadcrumb).toEqual([])
    })

    test('should return breadcrumb if cms request resolves', async () => {
      const pageStore = useCmsStore()

      await new Promise(process.nextTick)

      expect(pageStore.cmsLinks).toEqual(cmsLinks)
      expect(pageStore.breadcrumb).toEqual(breadcrumbResult)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
