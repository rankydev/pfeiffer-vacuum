import StoryblokClient from 'storyblok-js-client'

export class StoryblokApiClient {
  constructor() {
    this.client = new StoryblokClient({
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    })
  }

  resolveRichtextToHtml(richtext) {
    if (richtext && typeof richtext === 'object') {
      return this.client.richTextResolver.render(richtext)
    }
    return richtext + ''
  }
}
