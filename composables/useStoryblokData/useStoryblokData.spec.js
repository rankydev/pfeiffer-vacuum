import { useStoryblokData } from './index.js'

const data = [{ full_slug: 'someSlug' }]
const mockQuery = jest.fn(() => Promise.resolve({ data }))
const mockTransformUrl = jest.fn((slug) => slug)
const mockOnBeforeMount = jest.fn()
const mockOnServerPrefetch = jest.fn()

jest.mock('~/resolver/linksTransformer.js', () => ({
  transformUrl: (...args) => mockTransformUrl(...args),
}))

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    ...originalModule,
    useContext: () => ({
      i18n: { locale: 'en', t: (val) => val },
      $cms: { query: (...args) => mockQuery(...args) },
    }),
    useRoute: jest.fn(() =>
      ref({
        fullPath: '/someExample/',
        params: { category: 'some categeory' },
        query: {},
      })
    ),
    ssrRef: ref,
    onBeforeMount: (...args) => mockOnBeforeMount(...args),
    onServerPrefetch: (...args) => mockOnServerPrefetch(...args),
  }
})

describe('useStoryblokData', () => {
  beforeEach(() => {
    mockQuery.mockClear()
    mockTransformUrl.mockClear()
    mockOnBeforeMount.mockClear()
    mockOnServerPrefetch.mockClear()
  })

  describe('initial state', () => {
    test('should return getContentCategoryLink function', () => {
      const { getContentCategoryLink } = useStoryblokData()
      expect(getContentCategoryLink).toStrictEqual(expect.any(Function))
    })
  })

  describe('during getContentCategoryLink', () => {
    test('should register onServerPrefetch hook', () => {
      const { getContentCategoryLink } = useStoryblokData()

      getContentCategoryLink()

      expect(mockOnServerPrefetch).toBeCalledTimes(1)
      expect(mockOnServerPrefetch).toBeCalledWith(expect.any(Function))
    })

    test('should register onServerPrefetch hook', () => {
      const { getContentCategoryLink } = useStoryblokData()

      getContentCategoryLink()

      expect(mockOnBeforeMount).toBeCalledTimes(1)
      expect(mockOnBeforeMount).toBeCalledWith(expect.any(Function))
    })

    test('should return href and hasLink props', () => {
      const { getContentCategoryLink } = useStoryblokData()

      const { href, hasLink } = getContentCategoryLink()

      expect(href).toStrictEqual(expect.any(Object))
      expect(hasLink).toStrictEqual(expect.any(Object))
    })

    test('should fetchData when onBeforeMount executes', async () => {
      const { getContentCategoryLink } = useStoryblokData()
      const { href, hasLink } = getContentCategoryLink()

      await mockOnBeforeMount.mock.lastCall[0]()

      expect(href.value).toBe('en/someSlug')
      expect(hasLink.value).toBe(true)
    })

    test('should fetchData when onServerPrefetch executes', async () => {
      const { getContentCategoryLink } = useStoryblokData()
      const { href, hasLink } = getContentCategoryLink()

      await mockOnServerPrefetch.mock.lastCall[0]()

      expect(href.value).toBe('en/someSlug')
      expect(hasLink.value).toBe(true)
    })

    test('should not fetch the data twice', async () => {
      const { getContentCategoryLink } = useStoryblokData()
      getContentCategoryLink()

      await mockOnServerPrefetch.mock.lastCall[0]()
      await mockOnBeforeMount.mock.lastCall[0]()

      expect(mockQuery).toBeCalledTimes(1)
    })
  })

  // describe('business requirements', () => {})
})
