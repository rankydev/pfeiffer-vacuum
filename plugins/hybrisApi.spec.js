import { expect, jest, test } from '@jest/globals'
import hybrisApi from './hybrisApi.js'

describe('HybrisApiPlugin', () => {
  describe('initial state', () => {
    test('should inject hybrisApi into nuxt', () => {
      const injectMock = jest.fn()
      hybrisApi(null, injectMock)

      // TODO: add test
      expect(injectMock).toBeCalledTimes(1)
      expect(injectMock).toBeCalledWith('hybrisApi', expect.any(hybrisApi))
    })
  })
})
