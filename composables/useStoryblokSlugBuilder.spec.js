import useStoryblokSlugBuilder from './useStoryblokSlugBuilder'

describe('useStoryblokSlugBuilder', () => {
  const createContext = (currentRegionCode = 'global') => ({
    root: {
      $config: {
        LANGUAGE_CODES: ['de', 'ko', 'zh', 'en'],
        DEFAULT_LANGUAGE_CODE: 'en',
        CURRENT_REGION_CODE: currentRegionCode,
        DEFAULT_REGION_CODE: 'global',
      },
    },
  })

  describe('given CURRENT_REGION_CODE=global', () => {
    test('should return expected values given path=/en', () => {
      const { buildSlugs } = useStoryblokSlugBuilder(createContext('global'))
      const { slug, fallbackSlug, language } = buildSlugs('/en')

      expect(slug).toEqual('global')
      expect(fallbackSlug).toEqual('global/')
      expect(language).toEqual('en')
    })

    test('should return expected values given path=/', () => {
      const { buildSlugs } = useStoryblokSlugBuilder(createContext('global'))
      const { slug, fallbackSlug, language } = buildSlugs('/')

      expect(slug).toEqual('global')
      expect(fallbackSlug).toEqual('global/')
      expect(language).toEqual('en')
    })
  })

  describe('given CURRENT_REGION_CODE=germany', () => {
    test('should return expected values given path=/de', () => {
      const { buildSlugs } = useStoryblokSlugBuilder(createContext('germany'))
      const { slug, fallbackSlug, language } = buildSlugs('/de')

      expect(slug).toEqual('germany')
      expect(fallbackSlug).toEqual('germany/,global,global/')
      expect(language).toEqual('de')
    })

    test('should return expected values given path=/de/', () => {
      const { buildSlugs } = useStoryblokSlugBuilder(createContext('germany'))
      const { slug, fallbackSlug, language } = buildSlugs('/de/')

      expect(slug).toEqual('germany')
      expect(fallbackSlug).toEqual('germany/,global,global/')
      expect(language).toEqual('de')
    })

    test('should return expected values given path=/de/home', () => {
      const { buildSlugs } = useStoryblokSlugBuilder(createContext('germany'))
      const { slug, fallbackSlug, language } = buildSlugs('/de/home')
      expect(slug).toEqual('germany/home')
      expect(fallbackSlug).toEqual('germany/home/,global/home,global/home/')
      expect(language).toEqual('de')
    })
  })

  describe('given CURRENT_REGION_CODE=korea', () => {
    test('should return expected values given path=/en/home', () => {
      const { buildSlugs } = useStoryblokSlugBuilder(createContext('korea'))
      const { slug, fallbackSlug, language } = buildSlugs('/en/home')

      expect(slug).toEqual('korea/home')
      expect(fallbackSlug).toEqual('korea/home/,global/home,global/home/')
      expect(language).toEqual('en')
    })
  })
})
