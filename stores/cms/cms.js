import { defineStore } from 'pinia'
import {
  useContext,
  useRoute,
  unref,
  computed,
  useAsync,
} from '@nuxtjs/composition-api'
import { usePageStore } from '~/stores/page'

export const useCmsStore = defineStore('cms', () => {
  const pageStore = usePageStore()
  const route = useRoute()
  const { $cms } = useContext()

  const loadCmsLinks = async () => {
    const { data } = await $cms.query({ type: 'links' })
    return Object.values(data?.links || {})
  }
  const cmsLinks = useAsync(loadCmsLinks)

  const breadcrumb = computed(() => {
    const { path } = unref(route)
    const filterFolders = ({ is_folder }) => !is_folder
    const links = (unref(cmsLinks) || []).filter(filterFolders)

    const cleanSlug = (slug) => slug.replace(/\/$/, '').replace(/^\//, '')
    const joinSlug = (prefix, val) => (prefix ? `${prefix}/${val}` : val)
    const joinSlugs = (acc, ele) => [...acc, joinSlug([...acc].pop(), ele)]
    const isSlug = (val, { slug }) => cleanSlug(slug) === val
    const findSlug = (slug) => links.find((link) => isSlug(slug, link))
    const getHref = ({ slug }) => `/${cleanSlug(slug)}`
    const hasLanguage = ({ lang }) => lang === pageStore.language
    const getTranslation = (slug) => slug.find(hasLanguage)?.name
    const hasName = (slug) => slug?.name
    const getName = (slug) => getTranslation(slug.alternates) || slug.name
    const buildSlug = (slug) => ({ href: getHref(slug), name: getName(slug) })

    const slugs = cleanSlug(path).split('/').reduce(joinSlugs, [])
    return slugs.map(findSlug).filter(hasName).map(buildSlug)
  })

  return {
    cmsLinks,
    breadcrumb,
  }
})
