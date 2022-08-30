import { transform } from './linksTransformer'

describe('linksTransformer', () => {
  const createMockData = (region = 'global', trailingSlash = false) => ({
    'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
      path: `/en/${region}/home${trailingSlash ? '/' : ''}`,
      name: 'Home',
      isFolder: trailingSlash,
      isStartpage: true,
      translatedSlugs: [
        {
          path: `/de/${region}/home${trailingSlash ? '/' : ''}`,
          lang: 'de',
        },
        {
          path: `/ko/${region}/home${trailingSlash ? '/' : ''}`,
          lang: 'ko',
        },
      ],
    },
  })

  const createContext = (currentRegionCode = 'global') => ({
    $config: {
      CURRENT_REGION_CODE: currentRegionCode,
      DEFAULT_REGION_CODE: 'global',
      DEFAULT_LANGUAGE_CODE: 'en',
      baseURL: 'example.com',
    },
  })

  test('should transform the urls and keep the global context', () => {
    const inputLinks = createMockData('global')
    const context = createContext('global')
    const links = transform(inputLinks, context)

    const EXPECTED_LINKS = {
      'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
        isFolder: false,
        isStartpage: true,
        name: 'Home',
        path: '/en/home',
        translatedSlugs: [
          {
            lang: 'de',
            path: '/de/home',
          },
          {
            lang: 'ko',
            path: '/ko/home',
          },
        ],
      },
    }

    expect(links).toEqual(EXPECTED_LINKS)
  })

  test('should transform the urls and keep the germany context', () => {
    const inputLinks = createMockData('global')
    const context = createContext('germany')
    const links = transform(inputLinks, context)

    const EXPECTED_LINKS = {
      'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
        isFolder: false,
        isStartpage: true,
        name: 'Home',
        path: '/en/home',
        translatedSlugs: [
          {
            lang: 'de',
            path: '/de/home',
          },
          {
            lang: 'ko',
            path: '/ko/home',
          },
        ],
      },
    }

    expect(links).toEqual(EXPECTED_LINKS)
  })

  test('should transform the urls to absolute ones and switch the context', () => {
    const inputLinks = createMockData('germany')
    const context = createContext('global')
    const links = transform(inputLinks, context)

    const baseUrl = `${context.$config.baseURL}/germany`

    const EXPECTED_EXTERNAL_LINKS = {
      'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
        isFolder: false,
        isStartpage: true,
        name: 'Home',
        path: `${baseUrl}/en/home`,
        translatedSlugs: [
          {
            lang: 'de',
            path: `${baseUrl}/de/home`,
          },
          {
            lang: 'ko',
            path: `${baseUrl}/ko/home`,
          },
        ],
      },
    }

    expect(links).toEqual(EXPECTED_EXTERNAL_LINKS)
  })

  test('should keep trailing slash', () => {
    const inputLinks = createMockData('global', true)
    const context = createContext('global')
    const links = transform(inputLinks, context)

    const EXPECTED_LINKS = {
      'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
        isFolder: true,
        isStartpage: true,
        name: 'Home',
        path: '/en/home/',
        translatedSlugs: [
          {
            lang: 'de',
            path: '/de/home/',
          },
          {
            lang: 'ko',
            path: '/ko/home/',
          },
        ],
      },
    }

    expect(links).toEqual(EXPECTED_LINKS)
  })
})
