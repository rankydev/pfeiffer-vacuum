import useStoryblokSlugBuilder from './useStoryblokSlugBuilder'

describe('useStoryblokSlugBuilder', () => {
  function createContext() {
    return {
      root: {
        $config: {
          LANGUAGE_CODES: ['de', 'ko', 'zh', 'en'],
          REGION_CODES: 'global,germany,china,korea',
          DEFAULT_REGION_CODE: 'global',
          DEFAULT_LANGUAGE_CODE: 'en',
        },
      },
    }
  }

  test('should return expected values given /global/en', () => {
    const { buildSlugs } = useStoryblokSlugBuilder(createContext())
    const { slug, fallbackSlug, language } = buildSlugs('/global/en')

    expect(slug).toEqual('global')
    expect(fallbackSlug).toEqual('global/,global,global/')
    expect(language).toEqual('en')
  })

  test('should return expected values given /germany/de', () => {
    const { buildSlugs } = useStoryblokSlugBuilder(createContext())
    const { slug, fallbackSlug, language } = buildSlugs('/germany/de')

    expect(slug).toEqual('germany')
    expect(fallbackSlug).toEqual('germany/,global,global/')
    expect(language).toEqual('de')
  })

  test('should return expected values given /germany/de/', () => {
    const { buildSlugs } = useStoryblokSlugBuilder(createContext())
    const { slug, fallbackSlug, language } = buildSlugs('/germany/de/')

    expect(slug).toEqual('germany')
    expect(fallbackSlug).toEqual('germany/,global,global/')
    expect(language).toEqual('de')
  })

  test('should return expected values given germany/de/home', () => {
    const { buildSlugs } = useStoryblokSlugBuilder(createContext())
    const { slug, fallbackSlug, language } = buildSlugs('germany/de/home')
    expect(slug).toEqual('germany/home')
    expect(fallbackSlug).toEqual('germany/home/,global/home,global/home/')
    expect(language).toEqual('de')
  })

  test('should return expected values given /products/fluxkompensator', () => {
    const { buildSlugs } = useStoryblokSlugBuilder(createContext())
    const { slug, fallbackSlug, language } = buildSlugs(
      '/products/fluxkompensator'
    )
    expect(slug).toEqual('global/products/fluxkompensator')
    expect(fallbackSlug).toEqual(
      'global/products/fluxkompensator/,global/products/fluxkompensator,global/products/fluxkompensator/'
    )
    expect(language).toEqual('en')
  })

  test('should return expected values given korea/en/home', () => {
    const { buildSlugs } = useStoryblokSlugBuilder(createContext())
    const { slug, fallbackSlug, language } = buildSlugs('korea/en/home')

    expect(slug).toEqual('korea/home')
    expect(fallbackSlug).toEqual('korea/home/,global/home,global/home/')
    expect(language).toEqual('en')
  })
})
