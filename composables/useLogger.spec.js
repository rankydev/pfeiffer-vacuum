import { useLogger } from './useLogger'

const mockedLog = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      app: {
        $getLoggerFor: (name) => {
          return {
            info: (msg) => {
              mockedLog(`[info] [${name}] ${msg}`)
            },
            warn: (msg) => {
              mockedLog(`[warn] [${name}] ${msg}`)
            },
            error: (msg) => {
              mockedLog(`[error] [${name}] ${msg}`)
            },
          }
        },
      },
    }),
    getCurrentInstance: () => {
      return { proxy: { $options: { name: 'Test' } } }
    },
  }
})

describe('useLogger ', () => {
  it('should log info', () => {
    const { logger } = useLogger()
    logger.info('This is an info')
    expect(mockedLog).toBeCalledWith('[info] [Test] This is an info')
  })

  it('should log warn', () => {
    const { logger } = useLogger()
    logger.warn('Something looks weird')
    expect(mockedLog).toBeCalledWith('[warn] [Test] Something looks weird')
  })

  it('should log error', () => {
    const { logger } = useLogger()
    logger.error('Something went wrong!')
    expect(mockedLog).toBeCalledWith('[error] [Test] Something went wrong!')
  })
})
