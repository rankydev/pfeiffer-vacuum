import { defineStore } from 'pinia'
import {
  useContext,
  useRoute,
  unref,
  computed,
  useAsync,
} from '@nuxtjs/composition-api'

export const useCmsStore = defineStore('cms', () => {
  const route = useRoute()
  const { $cms } = useContext()

  const loadCmsLinks = async () => {
    const data = await $cms.getLinks()
    return Object.values(data || {})
  }
  const cmsLinks = useAsync(loadCmsLinks)

  const breadcrumb = computed(() => {
    const { path } = unref(route)
    const filterFolders = ({ isFolder }) => !isFolder

    const prepareSlugName = (name) => (slug) => ({
      ...slug,
      name: slug.name || name,
    })
    const getTranslationSlugs = (memo, value) => [
      ...memo,
      value,
      ...value.translatedSlugs.map(prepareSlugName(value.name)),
    ]
    const links = (unref(cmsLinks) || [])
      .filter(filterFolders)
      .reduce(getTranslationSlugs, [])

    const cleanSlug = (slug) => slug.replace(/\/$/, '').replace(/^\//, '')
    const joinSlug = (prefix, val) => (prefix ? `${prefix}/${val}` : val)
    const joinSlugs = (acc, ele) => [...acc, joinSlug([...acc].pop(), ele)]
    const isSlug = (val, { path }) => cleanSlug(path) === val
    const findSlug = (slug) => links.find((link) => isSlug(slug, link))
    const getHref = ({ path }) => `/${cleanSlug(path)}`
    const hasName = (slug) => slug?.name
    const buildSlug = (slug) => ({ href: getHref(slug), name: slug.name })

    const slugs = cleanSlug(path).split('/').reduce(joinSlugs, [])
    return slugs.map(findSlug).filter(hasName).map(buildSlug)
  })

  return {
    cmsLinks,
    breadcrumb,
  }
})
