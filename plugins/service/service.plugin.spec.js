import { expect, jest, test } from '@jest/globals'
import servicePlugin from './service.plugin.js'
import { StoryblokApiClient } from '~/plugins/storyblok/storyblok-api-client'

describe('Servicelugin', () => {
  describe('initial state', () => {
    test('should inject storyBlokApiClient into nuxt', () => {
      const injectMock = jest.fn()
      servicePlugin(null, injectMock)

      expect(injectMock).toBeCalledTimes(1)
      expect(injectMock).toBeCalledWith(
        'storyblokApiClient',
        expect.any(StoryblokApiClient)
      )
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
