import { StoryblokApiClient } from '../plugins/storyblok-api-client'

// eslint-disable-next-line
export default ({ app }, inject) => {
  const storyblokApiClient = new StoryblokApiClient('pvweb')

  inject('storyblokApiClient', storyblokApiClient)
}
