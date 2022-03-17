const useInternationalizationUrlBuilder = () => {
  const REGIONS = ['global', 'us', 'ger', 'sk', 'cn']
  const LANGUAGES = ['en', 'ko', 'zh', 'de']

  const DEFAULT_REGION = 'global'
  const DEFAULT_LANGUAGE = 'en'

  function buildUrl(url) {
    const urlsSegments = url.split('/').filter((segment) => segment !== '')
    console.log('url', url)
    console.log('urlsSegments', urlsSegments)

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
