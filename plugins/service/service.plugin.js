import { StoryblokApiClient } from '~/plugins/storyblok/storyblok-api-client'

export default (_, inject) => {
  const storyblokApiClient = new StoryblokApiClient('pvweb')

  inject('storyblokApiClient', storyblokApiClient)
}
