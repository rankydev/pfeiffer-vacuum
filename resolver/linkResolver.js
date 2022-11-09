import {
  withTrailingSlash,
  withoutTrailingSlash,
  cleanDoubleSlashes,
} from 'ufo'

const isEmailLinkType = (type) => type === 'email'
const isStoryLinkType = (type) => type === 'story'
const isBrowser = () => process.client && window
const getQueryParams = () => (isBrowser() ? window.location.search : '')
const isPreview = () => getQueryParams().includes('_storyblok')

export const render = ({ node: link, $storyblok, links, lang, context }) => {
  const { i18n } = context
  const { linktype } = link

  if (isEmailLinkType(linktype)) {
    const { email } = link
    return `mailto:${email}`
  }

  if (!isStoryLinkType(linktype)) {
    return link.cached_url
  }

  if (!link.id) {
    return ''
  }

  const { anchor } = link
  const linksWithTrailingSlash = $storyblok && $storyblok.linksWithTrailingSlash

  let href = '/'

  if (links?.[link.id]) {
    const linkInfo = links[link.id]

    if (lang) {
      const translatedSlug = linkInfo.translatedSlugs.find(
        (slug) => slug.lang === lang
      )
      href = translatedSlug ? translatedSlug.path : linkInfo.path
    } else {
      href = linkInfo.path
    }
  } else if (link.cached_url !== '') {
    href = `/${i18n.locale}/page-not-found-404`
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

  return cleanDoubleSlashes(href)
}
