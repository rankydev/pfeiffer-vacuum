import { expect, jest, test } from '@jest/globals'
import getLoggerFor from './getLoggerFor.js'

jest.useFakeTimers().setSystemTime(new Date('2023-01-01T02:00:00'))

describe('getLoggerFor', () => {
  describe('initial state', () => {
    test('should create logger instance', () => {
      const loggerInstance = getLoggerFor('Test')

      expect(typeof loggerInstance).toBe('object')
    })

    test('should log info', () => {
      const info = jest.fn()
      global.console = { info }
      const loggerInstance = getLoggerFor('Test')

      loggerInstance.info('This is an info')
      expect(info).toBeCalledWith(
        '[01.01.2023, 02:00:00,000]',
        '[Test]',
        'This is an info'
      )
    })
    test('should log warning', () => {
      const warn = jest.fn()
      global.console = { warn }
      const loggerInstance = getLoggerFor('Test')

      loggerInstance.warn('This looks weird')
      expect(warn).toBeCalledWith(
        '[01.01.2023, 02:00:00,000]',
        '[Test]',
        'This looks weird'
      )
    })
    test('should log error', () => {
      const error = jest.fn()
      global.console = { error }
      const loggerInstance = getLoggerFor('Test')

      loggerInstance.error('Something went wrong')
      expect(error).toBeCalledWith(
        '[01.01.2023, 02:00:00,000]',
        '[Test]',
        'Something went wrong'
      )
    })
  })
})
