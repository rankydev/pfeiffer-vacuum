import { defineStore } from 'pinia'
import {
  useContext,
  useRoute,
  ref,
  unref,
  computed,
} from '@nuxtjs/composition-api'
import { usePageStore } from '~/stores/page'

export const useCmsStore = defineStore('cms', () => {
  const pageStore = usePageStore()
  console.log(pageStore)
  const route = useRoute()
  const cmsLinks = ref([])

  const beardcrumb = computed(() => {
    const { fullPath } = unref(route)
    const links = unref(cmsLinks)?.data || []

    const cleanSlug = (slug) => slug.replace(/\/$/, '').replace(/^\//, '')
    const joinSlug = (prefix, val) => (prefix ? `${prefix}/${val}` : val)
    const joinSlugs = (acc, ele) => [...acc, joinSlug([...acc].pop(), ele)]
    const isSlug = (slug, { full_slug }) => cleanSlug(full_slug) === slug
    const findSlug = (slug) => links.find((link) => isSlug(slug, link))
    const getHref = ({ full_slug }) => `/${cleanSlug(full_slug)}`
    const hasLanguage = ({ lang }) => lang === pageStore.language
    const getTranslation = (slug) => slug.find(hasLanguage)?.name
    const hasName = (slug) => slug?.name
    const getName = (slug) => getTranslation(slug.translated_slugs) || slug.name
    const buildSlug = (slug) => ({ href: getHref(slug), name: getName(slug) })

    const slugs = cleanSlug(fullPath).split('/').reduce(joinSlugs, [])
    return slugs.map(findSlug).filter(hasName).map(buildSlug)
  })

  let cmsLinkPromise = null
  const loadCmsLinks = async () => {
    if (!cmsLinkPromise) {
      const { $cms } = useContext()
      cmsLinkPromise = $cms.query('links')
      cmsLinks.value = await cmsLinkPromise
    }
    await cmsLinkPromise
    return cmsLinks
  }

  loadCmsLinks()

  const dynamic = computed(() => {
    return [useDnymiacStore(), useDnymiacStore(), useDnymiacStore()]
  })

  console.log('dynamic', dynamic)

  return {
    beardcrumb,
    loadCmsLinks,
    dynamic,
  }
})

let idx = 0
export const useDnymiacStore = () => {
  idx++
  console.log(`cms-${idx}`)
  return defineStore(`cms-${idx}`, () => {
    return {
      test: ref(null),
    }
  })()
}
