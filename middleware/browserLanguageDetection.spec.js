import browserLanguageDetection from './browserLanguageDetection'

const redirect = jest.fn()

const validPathArray = [
  '/global/en',
  '/germany/de',
  '/global/en/some/path',
  '/korea/ko/some/other/path/',
]

const invalidPathArray = [
  // '',
  '/global',
  '/germany/some/path',
  '/unknown/en/some/path',
  '/some/other/path/',
]

describe('browserLanguageDetection', () => {
  function createContext({ path, language, server }) {
    process.env.DEFAULT_LANGUAGE_CODE = 'de'
    process.env.LANGUAGE_CODES = 'de,ko,zh,en'
    process.env.STORYBLOK_DEFAULT_REGION = 'global'
    process.env.STORYBLOK_REGIONS = 'global,korea,china,america,germany'
    process.server = server !== undefined ? server : true

    return {
      route: {
        path: path !== undefined ? path : '/global/en',
      },
      req: {
        headers: {
          'accept-language': language || 'en',
        },
      },
      redirect,
    }
  }

  beforeEach(redirect.mockClear)

  describe('given process.server=true', () => {
    test('should not call redirect given a valid route path', () => {
      validPathArray.forEach((validPath) => {
        browserLanguageDetection(createContext({ path: validPath }))
        expect(redirect).toBeCalledTimes(0)
      })
    })

    test('should not call redirect given an invalid route path', () => {
      invalidPathArray.forEach((invalidPath) => {
        redirect.mockClear()
        browserLanguageDetection(createContext({ path: invalidPath }))
        expect(redirect).toBeCalledTimes(1)
      })
    })

    test('should add region and laguage given an empty path', () => {
      browserLanguageDetection(createContext({ path: '' }))
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/global/en')
    })

    test('should add laguage given an valid region', () => {
      browserLanguageDetection(createContext({ path: '/germany' }))
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/germany/en')
    })

    test('should redirect to base path given an invalid path', () => {
      browserLanguageDetection(createContext({ path: '/some/invalid/path' }))
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/global/en')
    })

    test('should use the accept language header given a valid language code', () => {
      browserLanguageDetection(createContext({ path: '', language: 'zh' }))
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/global/zh')
    })

    test('should ignore the accept language header given am invalid language code', () => {
      browserLanguageDetection(createContext({ path: '', language: 'invalid' }))
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/global/de')
    })
  })

  describe('given process.server=false', () => {
    test('should do nothing given any path', () => {
      const pathArray = [...validPathArray, ...invalidPathArray]

      pathArray.forEach((path) => {
        browserLanguageDetection(createContext({ path, server: false }))
        expect(redirect).toBeCalledTimes(0)
      })
    })
  })
})
