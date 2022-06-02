import { withoutTrailingSlash } from 'ufo'

const useInternationalizationUrlBuilder = ({ root: context }) => {
  const {
    REGION_CODES,
    DEFAULT_REGION_CODE,
    DEFAULT_LANGUAGE_CODE,
    LANGUAGE_CODES,
  } = context.$config

  function buildUrl(url) {
    const urlsSegments = url.split('/').filter((segment) => segment !== '')

    const region = REGION_CODES.includes(urlsSegments[0])
      ? urlsSegments.shift()
      : DEFAULT_REGION_CODE

    const language = LANGUAGE_CODES.includes(urlsSegments[0])
      ? urlsSegments.shift()
      : DEFAULT_LANGUAGE_CODE

    const slug = urlsSegments.join('/')

    const generatedSlug = withoutTrailingSlash(`${region}/${slug}`)
    const generatedFallbackSlug = withoutTrailingSlash(
      `${DEFAULT_REGION_CODE}/${slug}`
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
