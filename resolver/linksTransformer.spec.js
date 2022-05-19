import { transform } from './linksTransformer'

describe('linksTransformer', () => {
  const CMS_LINKS_MOCK_DATA = {
    'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
      path: '/en/global/home',
      name: 'Home',
      isFolder: false,
      isStartpage: true,
      translatedSlugs: [
        {
          path: '/de/global/home',
          lang: 'de',
        },
        {
          path: '/ko/global/home',
          lang: 'ko',
        },
      ],
    },
  }

  function createContext() {
    return {
      $config: {
        REGION_CODES: 'global,germany,china,korea',
        DEFAULT_REGION_CODE: 'global',
        DEFAULT_LANGUAGE_CODE: 'en',
      },
    }
  }

  test('should transform the urls and keep the global context', () => {
    const links = transform(CMS_LINKS_MOCK_DATA, {
      ...createContext(),
      route: {
        path: '/global/en',
      },
    })

    const EXPECTED_LINKS = {
      'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
        isFolder: false,
        isStartpage: true,
        name: 'Home',
        path: '/global/en/home',
        translatedSlugs: [
          {
            lang: 'de',
            path: '/global/de/home',
          },
          {
            lang: 'ko',
            path: '/global/ko/home',
          },
        ],
      },
    }

    expect(links).toEqual(EXPECTED_LINKS)
  })

  test('should transform the urls and keep the germany context', () => {
    const links = transform(CMS_LINKS_MOCK_DATA, {
      ...createContext(),
      route: {
        path: '/germany/en',
      },
    })

    const EXPECTED_LINKS = {
      'ad837da9-7e42-4a40-a541-cdf168fc6ef6': {
        isFolder: false,
        isStartpage: true,
        name: 'Home',
        path: '/germany/en/home',
        translatedSlugs: [
          {
            lang: 'de',
            path: '/germany/de/home',
          },
          {
            lang: 'ko',
            path: '/germany/ko/home',
          },
        ],
      },
    }

    expect(links).toEqual(EXPECTED_LINKS)
  })
})
