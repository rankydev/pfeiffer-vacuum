import {
  withTrailingSlash,
  withoutTrailingSlash,
  cleanDoubleSlashes,
} from 'ufo'
import { useLogger } from '~/composables/useLogger'

const isEmailLinkType = (type) => type === 'email'
const isStoryLinkType = (type) => type === 'story'
const isBrowser = () => process.client && window
const getQueryParams = () => (isBrowser() ? window.location.search : '')
const isPreview = () => getQueryParams().includes('_storyblok')

export const render = ({ node: link, $storyblok, links, lang }) => {
  const { linktype } = link
  const { logger } = useLogger('linkResolver')

  if (isStoryLinkType(linktype)) {
    if (!link.id) {
      return ''
    }

    const { anchor } = link
    const linksWithTrailingSlash =
      $storyblok && $storyblok.linksWithTrailingSlash

    let href = '/'

    if (links && links[link.id]) {
      const linkInfo = links[link.id]

      if (lang) {
        const translatedSlug = linkInfo.translatedSlugs.find(
          (slug) => slug.lang === lang
        )
        href = translatedSlug ? translatedSlug.path : linkInfo.path
      } else {
        href = linkInfo.path
      }
    } else if (link.cached_url.startsWith('/')) {
      href = link.cached_url
    } else if (link.cached_url !== '') {
      href = '/' + link.cached_url
    }

    if (linksWithTrailingSlash === true) {
      href = withTrailingSlash(href)
    } else {
      href = withoutTrailingSlash(href)
    }

    if (isPreview()) {
      href += getQueryParams()
    }

    if (anchor) {
      href += `#${anchor}`
    }

    if (!links[link.id]) {
      logger.warn(
        `Couldn't find link for id '${link.id}', using cached_url '${link.cached_url}' to build href '${href}'`
      )
    }

    return cleanDoubleSlashes(href)
  }

  if (isEmailLinkType(linktype)) {
    const { email } = link
    return `mailto:${email}`
  }

  return link.cached_url
}
