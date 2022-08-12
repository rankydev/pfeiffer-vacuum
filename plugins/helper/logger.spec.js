import { expect, jest, test } from '@jest/globals'
import logger from './logger.js'

jest.useFakeTimers().setSystemTime(new Date('2023-01-01T02:00:00'))

describe('Logger', () => {
  describe('initial state', () => {
    test('should inject logger into nuxt', () => {
      const context = {
        app: {},
      }
      const inject = jest.fn()
      logger(context, inject)

      expect(inject).toBeCalledWith('getLoggerFor', expect.any(Function))
    })
  })
})
