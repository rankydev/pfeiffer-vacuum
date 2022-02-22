import { StoryblokApiClient } from './storyblok-api-client'

export default ({ app }, inject) => {
  const storyblokApiClient = new StoryblokApiClient('pvweb')

  inject('storyblokApiClient', storyblokApiClient)
}
