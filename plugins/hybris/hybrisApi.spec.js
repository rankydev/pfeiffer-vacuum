import { expect, jest, test } from '@jest/globals'
import hybrisApi from './hybrisApi.js'

describe('HybrisApiPlugin', () => {
  describe('initial state', () => {
    test('should inject hybrisApi into nuxt', () => {
      const context = {
        app: {},
        $axios: {
          create: jest.fn(() => {
            return {
              setBaseURL: jest.fn(),
              setHeader: jest.fn(),
            }
          }),
        },
        $getLoggerFor: () => ({
          error: jest.fn(),
        }),
      }

      hybrisApi(context)

      expect(typeof context.app.$hybrisApi).toBe('object')
      expect(typeof context.$hybrisApi).toBe('object')
    })

    test('should inject hybrisApi into store if present', () => {
      const context = {
        app: {},
        store: {},
        $axios: {
          create: jest.fn(() => {
            return {
              setBaseURL: jest.fn(),
              setHeader: jest.fn(),
            }
          }),
        },
        $getLoggerFor: () => ({
          error: jest.fn(),
        }),
      }

      hybrisApi(context)

      expect(typeof context.store.$hybrisApi).toBe('object')
    })
  })
})
