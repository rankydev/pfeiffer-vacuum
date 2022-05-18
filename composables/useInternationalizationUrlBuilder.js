import { withoutTrailingSlash } from 'ufo'

const useInternationalizationUrlBuilder = ({ root: context }) => {
  const REGIONS = context.$cms.regions.split(',')
  const DEFAULT_REGION = context.$cms.defaultRegion

  const LANGUAGES = context.$config.languages
  const DEFAULT_LANGUAGE = context.$cms.defaultLanguageCode

  function buildUrl(url) {
    const urlsSegments = url.split('/').filter((segment) => segment !== '')

    const region = REGIONS.includes(urlsSegments[0])
      ? urlsSegments.shift()
      : DEFAULT_REGION

    const language = LANGUAGES.includes(urlsSegments[0])
      ? urlsSegments.shift()
      : DEFAULT_LANGUAGE

    const slug = urlsSegments.join('/')

    const generatedSlug = withoutTrailingSlash(`${region}/${slug}`)
    const generatedFallbackSlug = withoutTrailingSlash(
      `${DEFAULT_REGION}/${slug}`
    )

    return {
      slug: generatedSlug,
      fallbackSlug: `${generatedSlug}/,${generatedFallbackSlug},${generatedFallbackSlug}/`,
      language,
    }
  }

  return {
    buildUrl,
  }
}

export default useInternationalizationUrlBuilder
