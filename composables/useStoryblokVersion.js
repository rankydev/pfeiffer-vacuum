import { useRoute, computed } from '@nuxtjs/composition-api'
import * as crypto from 'crypto'

export const useStoryblokVersion = () => {
  const route = useRoute()

  const version = computed(() => {
    const { fullPath } = route

    const urlSearchParam = new URLSearchParams(fullPath || '')
    const validationString =
      urlSearchParam.get('_storyblok_tk[space_id]') +
      ':' +
      process.env.STORYBLOK_ACCESS_TOKEN +
      ':' +
      urlSearchParam.get('_storyblok_tk[timestamp]')
    const validationToken = crypto
      .createHash('sha1')
      .update(validationString)
      .digest('hex')
    const paramTimeStamp = urlSearchParam.get('_storyblok_tk[timestamp]') || 0

    if (
      urlSearchParam.get('_storyblok_tk[token]') === validationToken &&
      paramTimeStamp > Math.floor(Date.now() / 1000) - 3600
    ) {
      // you're in the edit mode.
      console.log('*** Storyblok Version: DRAFT ***')
      return 'draft'
    } else {
      console.log('*** Storyblok Version: PUBLISHED ***')
      return 'published'
    }
  })

  return { version }
}
