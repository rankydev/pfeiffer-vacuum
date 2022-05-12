import useInternationalizationUrlBuilder from './useInternationalizationUrlBuilder'

describe('useInternationalizationUrlBuilder', () => {
  function createContext() {
    return {
      root: {
        $config: {
          languages: ['de', 'ko', 'zh', 'en'],
        },
        $cms: {
          regions: 'global,de,zh,ko',
          defaultRegion: 'global',
          defaultLanguageCode: 'en',
        },
      },
    }
  }

  test('test default url', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/')

    expect(slug).toEqual('global/')
    expect(fallbackSlug).toEqual('global//,global/,global//')
    expect(language).toEqual('en')
  })

  test('test germany de page', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/de/de')

    expect(slug).toEqual('de/')
    expect(fallbackSlug).toEqual('de//,global/,global//')
    expect(language).toEqual('de')
  })

  test('test home url without region and language', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('/home')
    expect(slug).toEqual('global/home')
    expect(fallbackSlug).toEqual('global/home/,global/home,global/home/')
    expect(language).toEqual('en')
  })

  test('test complex url without region and language', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl(
      '/products/fluxkompensator'
    )
    expect(slug).toEqual('global/products/fluxkompensator')
    expect(fallbackSlug).toEqual('global/products/fluxkompensator/,global/products/fluxkompensator,global/products/fluxkompensator/')
    expect(language).toEqual('en')
  })

  test('test home url for a specific region', () => {
    const { buildUrl } = useInternationalizationUrlBuilder(createContext())
    const { slug, fallbackSlug, language } = buildUrl('ko/en/home')

    expect(slug).toEqual('ko/home')
    expect(fallbackSlug).toEqual('ko/home/,global/home,global/home/')
    expect(language).toEqual('en')
  })
})
