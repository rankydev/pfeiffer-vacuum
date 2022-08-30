import StoryblokClient from 'storyblok-js-client'

export class StoryblokApiClient extends StoryblokClient {
  constructor() {
    super({
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    })
  }
}
