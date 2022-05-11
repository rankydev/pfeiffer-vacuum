import browserLanguageDetection from './browserLanguageDetection'

const redirect = jest.fn()

describe('browserLanguageDetection', () => {
  function createContext(path, language) {
    process.env.DEFAULT_LANGUAGE_CODE = 'de'
    process.env.LANGUAGE_CODES = 'de,ko,zh,en'
    process.env.STORYBLOK_DEFAULT_REGION = 'global'
    process.env.STORYBLOK_REGIONS = 'global,korea,china,america,germany'
    process.server = true

    return {
      route: {
        path: path,
      },
      req: {
        headers: {
          'accept-language': language,
        },
      },
      redirect,
    }
  }

  test('should work correctly with valid url', () => {
    browserLanguageDetection(createContext('global/de', 'de'))

    expect(redirect).toBeCalledWith('/de/de')
  })
})
