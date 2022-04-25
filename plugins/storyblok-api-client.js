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

  resolveRichtextToHtml(richtext) {
    if (richtext && typeof richtext === 'object') {
      return this.richTextResolver.render(richtext)
    }
    return richtext + ''
  }
}
