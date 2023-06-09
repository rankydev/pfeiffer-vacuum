import { useRoute, computed, useContext } from '@nuxtjs/composition-api'
import * as crypto from 'crypto'

export const useStoryblokVersion = () => {
  const route = useRoute()
  const { $cms, $config } = useContext()

  const version = computed(() => {
    const validationString =
      route.value.query?.['_storyblok_tk[space_id]'] +
      ':' +
      $cms.accessToken +
      ':' +
      route.value.query?.['_storyblok_tk[timestamp]']
    const validationToken = crypto
      .createHash('sha1')
      .update(validationString)
      .digest('hex')
    const paramTimeStamp = route.value.query?.['_storyblok_tk[timestamp]'] || 0
    const isValidPreview = computed(
      () =>
        route.value.query?.['_storyblok_tk[token]'] === validationToken &&
        paramTimeStamp > Math.floor(Date.now() / 1000) - 3600
    )

    if (isValidPreview.value || $config.NODE_ENV === 'development') {
      // you're in the edit mode.
      return 'draft'
    } else {
      return 'published'
    }
  })

  const isStoryblokPreview = computed(() => version.value === 'draft')

  return { version, isStoryblokPreview }
}
