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

    let language = LANGUAGES.includes(urlsSegments[0])
      ? urlsSegments.shift()
      : DEFAULT_LANGUAGE
    language = language === DEFAULT_LANGUAGE ? '' : language

    const slug = urlsSegments.join('/')

    return {
      slug: `${region}/${slug}`,
      fallbackSlug: `${DEFAULT_REGION}/${slug}`,
      language,
    }
  }

  return {
    buildUrl,
  }
}

export default useInternationalizationUrlBuilder
