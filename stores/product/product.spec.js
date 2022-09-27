import { setActivePinia, createPinia } from 'pinia'

const mockLogger = jest.fn()

jest.mock('~/utils/getLoggerFor', () => {
  return () => ({
    error: (e) => mockLogger(e),
  })
})

describe('Product store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return false initial value', () => {})
  })

  describe('during interaction', () => {})
})
