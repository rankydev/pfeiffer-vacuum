import { setActivePinia, createPinia } from 'pinia'

const mockLogger = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: (e) => mockLogger(e),
      },
    }
  },
}))

describe('Product store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return false initial value', () => {})
  })

  describe('during interaction', () => {})
})
