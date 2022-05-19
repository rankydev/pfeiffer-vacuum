import useInternationalizationUrlBuilder from './useInternationalizationUrlBuilder'

describe('useInternationalizationUrlBuilder', () => {
  function createContext() {
    return {
      root: {
        $config: {
          languages: ['de', 'ko', 'zh', 'en'],
        },
        $cms: {
          regions: 'global,germany,china,korea',
          defaultRegion: 'global',
          defaultLanguageCode: 'en',
        },
      },
    }
  }

  test('should return expected values given /global/en', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/global/en')

    expect(slug).toEqual('global')
    expect(fallbackSlug).toEqual('global/,global,global/')
    expect(language).toEqual('en')
  })

  test('should return expected values given /germany/de', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/germany/de')

    expect(slug).toEqual('germany')
    expect(fallbackSlug).toEqual('germany/,global,global/')
    expect(language).toEqual('de')
  })

  test('should return expected values given /germany/de/', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/germany/de/')

    expect(slug).toEqual('germany')
    expect(fallbackSlug).toEqual('germany/,global,global/')
    expect(language).toEqual('de')
  })

  test('should return expected values given germany/de/home', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('germany/de/home')
    expect(slug).toEqual('germany/home')
    expect(fallbackSlug).toEqual('germany/home/,global/home,global/home/')
    expect(language).toEqual('de')
  })

  test('should return expected values given /products/fluxkompensator', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl(
      '/products/fluxkompensator'
    )
    expect(slug).toEqual('global/products/fluxkompensator')
    expect(fallbackSlug).toEqual(
      'global/products/fluxkompensator/,global/products/fluxkompensator,global/products/fluxkompensator/'
    )
    expect(language).toEqual('en')
  })

  test('should return expected values given korea/en/home', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('korea/en/home')

    expect(slug).toEqual('korea/home')
    expect(fallbackSlug).toEqual('korea/home/,global/home,global/home/')
    expect(language).toEqual('en')
  })
})
