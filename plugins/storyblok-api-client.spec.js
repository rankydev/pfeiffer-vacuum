import { StoryblokApiClient } from './storyblok-api-client'

describe('StoryblokApiClient', () => {
  describe('initial state', () => {
    test('should set access token when env is provided', () => {
      const accessToken = 'someToken'
      process.env.STORYBLOK_ACCESS_TOKEN = accessToken

      const client = new StoryblokApiClient()

      expect(client.accessToken).toBe(accessToken)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
