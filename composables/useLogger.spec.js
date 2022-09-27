import { useLogger } from './useLogger'

const mockedLog = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    getCurrentInstance: () => {
      return { proxy: { $options: { name: 'FromContext' } } }
    },
  }
})

jest.useFakeTimers().setSystemTime(new Date('2023-01-01T02:00:00'))

describe('useLogger ', () => {
  test('should create logger instance', () => {
    const { logger } = useLogger('Test')

    expect(typeof logger).toBe('object')
  })

  test('should log info', () => {
    const info = jest.fn()
    global.console = { info }
    const { logger } = useLogger('Test')

    logger.info('This is an info')
    expect(info).toBeCalledWith(
      '[01.01.2023, 02:00:00,000]',
      '[Test]',
      'This is an info'
    )
  })
  test('should log warning', () => {
    const warn = jest.fn()
    global.console = { warn }
    const { logger } = useLogger('Test')

    logger.warn('This looks weird')
    expect(warn).toBeCalledWith(
      '[01.01.2023, 02:00:00,000]',
      '[Test]',
      'This looks weird'
    )
  })
  test('should log error', () => {
    const error = jest.fn()
    global.console = { error }
    const { logger } = useLogger('Test')

    logger.error('Something went wrong')
    expect(error).toBeCalledWith(
      '[01.01.2023, 02:00:00,000]',
      '[Test]',
      'Something went wrong'
    )
  })

  test('should use logger name from context if no name was passed to the composable', () => {
    const error = jest.fn()
    global.console = { error }
    const { logger } = useLogger()

    logger.error('Something went wrong')
    expect(error).toBeCalledWith(
      '[01.01.2023, 02:00:00,000]',
      '[FromContext]',
      'Something went wrong'
    )
  })
})
