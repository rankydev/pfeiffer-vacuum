import { beforeEach, describe, expect } from '@jest/globals'
import { useErrorHandler } from './index.js'

const mockError = jest.fn()
const mockOnBeforeMount = jest.fn()
const mockLogger = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: (...args) => mockLogger(...args),
      },
    }
  },
}))

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    ...originalModule,
    useContext: () => ({
      error: (...args) => mockError(...args),
      res: {
        statusCode: 200,
      },
    }),
    onBeforeMount: (...args) => mockOnBeforeMount(...args),
    ssrRef: ref,
  }
})

describe('useErrorHandler', () => {
  beforeEach(() => {
    mockError.mockClear()
    mockOnBeforeMount.mockClear()
    mockLogger.mockClear()
    process.server = false
  })

  describe('initial state', () => {
    test('should return redirectOnError on error function', () => {
      const { redirectOnError } = useErrorHandler()
      expect(redirectOnError).toStrictEqual(expect.any(Function))
    })

    test('should register onBeforeMount hook', () => {
      useErrorHandler()
      expect(mockOnBeforeMount).toBeCalledTimes(1)
      expect(mockOnBeforeMount).toBeCalledWith(expect.any(Function))
    })
  })

  describe('during interaction', () => {
    describe('given process.server false', () => {
      test('should call conext.error when cb fails', async () => {
        const { redirectOnError } = useErrorHandler()
        const message = 'Some Error'
        const cb = jest.fn(() => Promise.reject({ message }))

        await redirectOnError(cb)

        expect(mockError).toBeCalledTimes(1)
        expect(mockError).toBeCalledWith({ statusCode: 404, message })
        expect(mockLogger).toBeCalledTimes(1)
        expect(mockLogger).toBeCalledWith({ message })
      })

      test('should not call context.error if cb succeeds', async () => {
        const { redirectOnError } = useErrorHandler()
        const cb = jest.fn(() => Promise.resolve())

        await redirectOnError(cb)

        expect(mockError).toBeCalledTimes(0)
        expect(mockLogger).toBeCalledTimes(0)
      })
    })

    describe('given process.server true', () => {
      test('should not call context.error if cb fails', async () => {
        process.server = true
        const { redirectOnError } = useErrorHandler()
        const message = 'Some Error'
        const cb = jest.fn(() => Promise.reject({ message }))

        await redirectOnError(cb)

        expect(mockError).toBeCalledTimes(0)
      })

      describe('given onBeforeMount function call', () => {
        test('should call context.error when cb failed', async () => {
          process.server = true
          const { redirectOnError } = useErrorHandler()
          const message = 'Some Error'
          const cb = jest.fn(() => Promise.reject({ message }))

          await redirectOnError(cb)

          mockOnBeforeMount.mock.lastCall[0]()

          expect(mockError).toBeCalledTimes(1)
          expect(mockError).toBeCalledWith({ statusCode: 404, message })
          expect(mockLogger).toBeCalledTimes(1)
          expect(mockLogger).toBeCalledWith({ message })
        })

        test('should not call context.error when cb succeeded', async () => {
          process.server = true
          const { redirectOnError } = useErrorHandler()
          const cb = jest.fn(() => Promise.resolve())

          await redirectOnError(cb)

          mockOnBeforeMount.mock.lastCall[0]()

          expect(mockError).toBeCalledTimes(0)
          expect(mockLogger).toBeCalledTimes(0)
        })
      })
    })
  })

  // describe('business requirements', () => {})
})
