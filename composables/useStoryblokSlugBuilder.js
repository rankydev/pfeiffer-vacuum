import { withoutTrailingSlash } from 'ufo'

const cleanSlug = (slug) => withoutTrailingSlash(slug)

const useStoryblokSlugBuilder = ({ root: context }) => {
  const {
    LANGUAGE_CODES,
    DEFAULT_LANGUAGE_CODE,
    CURRENT_REGION_CODE,
    DEFAULT_REGION_CODE,
  } = context.$config

  const isDefaultRegion = CURRENT_REGION_CODE === DEFAULT_REGION_CODE

  /**
   * Generate the storyblok slug as well as possible fallback slugs
   * from a given url. Also returns the extracted language key.
   *
   * @param {string} url
   * @returns Object
   */
  function buildSlugs(url) {
    const urlSegments = url.split('/').filter((segment) => segment !== '')

    /**
     * splice the first segment, if itt is a valid language code
     * returns default lanugage code otherwise
     */
    const language = LANGUAGE_CODES.includes(urlSegments[0])
      ? urlSegments.shift()
      : DEFAULT_LANGUAGE_CODE

    const slugSegment = urlSegments.join('/')

    const slug = cleanSlug(`${CURRENT_REGION_CODE}/${slugSegment}`)
    const defaultSlug = cleanSlug(`${DEFAULT_REGION_CODE}/${slugSegment}`)

    /**
     * Adds default region slugs as fallback if the current region
     * is not the default one. Adds all slugs with and without trailing slash
     * because storyblok otherwise ignore pages marked as root.
     */
    const fallbackSlug = [
      `${slug}/`,
      ...(isDefaultRegion ? [] : [`${defaultSlug}`, `${defaultSlug}/`]),
    ].join(',')

    return { slug, fallbackSlug, language }
  }

  return {
    buildSlugs,
  }
}

export default useStoryblokSlugBuilder
