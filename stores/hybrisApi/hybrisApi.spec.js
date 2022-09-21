import { expect, jest, test } from '@jest/globals'
import hybrisApi from './useHybrisApi.js'
import { createPinia, setActivePinia } from 'pinia'

const context = {
  app: {},
  store: {},
  $axios: {
    create: jest.fn(() => {
      return {
        setBaseURL: jest.fn(),
        setHeader: jest.fn(),
        interceptors: {
          request: {
            use: jest.fn(),
          },
          response: {
            use: jest.fn(),
          },
        },
      }
    }),
  },
  $getLoggerFor: () => ({
    error: jest.fn(),
  }),
}

describe('HybrisApiPlugin', () => {
  beforeEach(() => setActivePinia(createPinia()))
  describe('initial state', () => {
    test('should inject hybrisApi into nuxt', () => {
      hybrisApi(context)

      expect(typeof context.app.$hybrisApi).toBe('object')
      expect(typeof context.$hybrisApi).toBe('object')
    })

    test('should inject hybrisApi into store if present', () => {
      hybrisApi(context)

      expect(typeof context.store.$hybrisApi).toBe('object')
    })
  })
})
