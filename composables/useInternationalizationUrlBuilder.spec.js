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

  test('test default url', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/global/en')

    expect(slug).toEqual('global')
    expect(fallbackSlug).toEqual('global/,global,global/')
    expect(language).toEqual('en')
  })

  test('test germany de page', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/germany/de')

    expect(slug).toEqual('germany')
    expect(fallbackSlug).toEqual('germany/,global,global/')
    expect(language).toEqual('de')
  })

  test('test germany de page with trailing slash', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/germany/de/')

    expect(slug).toEqual('germany')
    expect(fallbackSlug).toEqual('germany/,global,global/')
    expect(language).toEqual('de')
  })

  test('test home slug of the german region', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('germany/de/home')
    expect(slug).toEqual('germany/home')
    expect(fallbackSlug).toEqual('germany/home/,global/home,global/home/')
    expect(language).toEqual('de')
  })

  test('test complex url without region and language', () => {
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

  test('test home url for a specific region', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('korea/en/home')

    expect(slug).toEqual('korea/home')
    expect(fallbackSlug).toEqual('korea/home/,global/home,global/home/')
    expect(language).toEqual('en')
  })
})
