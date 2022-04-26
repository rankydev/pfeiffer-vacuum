import { defineStore } from 'pinia'
import {
  useContext,
  useRoute,
  unref,
  computed,
  useAsync,
  watch,
} from '@nuxtjs/composition-api'
import { usePageStore } from '~/stores/page'

export const useCmsStore = defineStore('cms', () => {
  const pageStore = usePageStore()
  const route = useRoute()

  const loadCmsLinks = async () => {
    const { $cms } = useContext()
    return $cms.query('links')
  }
  const cmsLinks = useAsync(async () => (await loadCmsLinks()).data)

  const breadcrumb = computed(() => {
    const { path } = unref(route)
    console.log(route)
    const links = unref(cmsLinks) || []

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

    const slugs = cleanSlug(path).split('/').reduce(joinSlugs, [])
    return slugs.map(findSlug).filter(hasName).map(buildSlug)
  })

  return {
    cmsLinks,
    breadcrumb,
  }
})
