import {
  onBeforeMount,
  onServerPrefetch,
  ssrRef,
  computed,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api'
import categorySchema from '~/components/templates/CategoryContentPage/CategoryContentPage.schema.js'
import { transformUrl } from '~/resolver/linksTransformer.js'
import { joinURL } from 'ufo'

export const useStoryblokData = () => {
  const route = useRoute()
  const context = useContext()
  const { $cms, i18n } = context

  const getContentCategoryLink = () => {
    const fetched = ssrRef(false)
    const href = ssrRef(null)
    const hasLink = computed(() => !!href.value)
    const key = computed(() => route.value.params.category)

    const fetch = async () => {
      if (fetched.value || !key.value) return

      const options = {
        excluding_fields: Object.keys(categorySchema.schema).join(','),
        per_page: 1,
        filter_query: {
          categoryShopId: {
            like: key.value,
          },
        },
      }
      const { data } = await $cms.query({ options })
      fetched.value = true

      /* istanbul ignore next */
      if (!data?.[0]?.full_slug) return

      const fullSlug = joinURL(i18n.locale, data[0].full_slug)
      href.value = transformUrl(fullSlug, context)
    }

    onServerPrefetch(fetch)
    onBeforeMount(fetch)

    return { href, hasLink }
  }

  return { getContentCategoryLink }
}
