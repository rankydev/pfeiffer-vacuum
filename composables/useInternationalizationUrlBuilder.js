import { withoutTrailingSlash } from 'ufo'

const useInternationalizationUrlBuilder = ({ root: context }) => {
  const REGIONS = (process.env.STORYBLOK_REGIONS || '').split(',')
  const DEFAULT_REGION = process.env.STORYBLOK_DEFAULT_REGION || ''
  const LANGUAGES = (process.env.LANGUAGE_CODES || '').split(',')
  const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE_CODE || ''

  const isEmpty = (ele) => (ele?.length || 0) === 0
  const processEnvs = [REGIONS, DEFAULT_REGION, LANGUAGES, DEFAULT_LANGUAGE]

  function buildUrl(url) {
    if (processEnvs.some(isEmpty)) {
      console.error(
        'useInternationalizationUrlBuilder: Empty process env',
        processEnvs.join(', ')
      )
      return {
        slug: 'global',
        fallbackSlug: 'global/',
        language: 'en',
      }
    }

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
