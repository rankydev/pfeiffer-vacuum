import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import {
  useContext,
  useRoute,
  unref,
  ssrRef,
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

  /**
   * We need to create a ssr ref here to ensure that cmsLinks will
   * be fetched on each server request. Otherwise a cached cmsLinks
   * response will be returned across all requests and content
   * changes that affect the breadcrumb will not reflected immediately.
   */
  const cmsLinkRef = ssrRef(nanoid())
  const cmsLinks = useAsync(loadCmsLinks, unref(cmsLinkRef))

  const breadcrumb = computed(() => {
    const { path: routePath } = unref(route)
    const filterFolders = ({ isFolder }) => !isFolder

    const prepareSlugName = (name) => (slug) => ({
      ...slug,
      name: slug.name || name,
    })
    const getTranslationSlugs = (memo, value) => [
      ...memo,
      value,
      ...(value.translatedSlugs || []).map(prepareSlugName(value.name)),
    ]
    const links = (unref(cmsLinks) || [])
      .filter(filterFolders)
      .reduce(getTranslationSlugs, [])

    const cleanSlug = (slug) => slug.replace(/\/$/, '').replace(/^\//, '')
    const joinSlug = (prefix, val) => (prefix ? `${prefix}/${val}` : val)
    const joinSlugs = (acc, ele) => [...acc, joinSlug([...acc].pop(), ele)]
    const isSlug = (val, { path }) => (path ? cleanSlug(path) : false) === val
    const findSlug = (slug) => links.find((link) => isSlug(slug, link))
    const getHref = ({ path }) => `/${path ? cleanSlug(path) : ''}`
    const hasName = (slug) => slug?.name
    const buildSlug = (slug) => ({ href: getHref(slug), name: slug.name })

    const slugs = cleanSlug(routePath).split('/').reduce(joinSlugs, [])
    return slugs.map(findSlug).filter(hasName).map(buildSlug)
  })

  return {
    cmsLinks,
    breadcrumb,
  }
})
