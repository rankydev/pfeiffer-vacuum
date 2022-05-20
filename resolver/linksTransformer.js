function appendTrailingSlashIfRequired(url, append) {
  return append && !url.endsWith('/') ? url + '/' : url
}

export function transform(links, context) {
  const { REGION_CODES, DEFAULT_REGION_CODE } = context.$config

  const urlsSegments = context.route.path
    .split('/')
    .filter((segment) => segment !== '')

  const currentRegion = REGION_CODES.includes(urlsSegments[0])
    ? urlsSegments.shift()
    : DEFAULT_REGION_CODE

  function transformUrl(url, currentRegion) {
    const isTrailingSlash = url.endsWith('/')
    const urlsSegments = url.split('/').filter((segment) => segment !== '')
    const language = urlsSegments.shift()
    const region = urlsSegments.shift()
    const slug = urlsSegments.join('/')

    if (region === DEFAULT_REGION_CODE) {
      return appendTrailingSlashIfRequired(
        `/${currentRegion}/${language}/${slug}`,
        isTrailingSlash
      )
    } else {
      return appendTrailingSlashIfRequired(
        `/${region}/${language}/${slug}`,
        isTrailingSlash
      )
    }
  }

  const transformedLinks = {}

  for (const [key, value] of Object.entries(links)) {
    const path = transformUrl(value.path, currentRegion, true)
    const translatedSlugs = value.translatedSlugs.map((item) => ({
      ...item,
      path: transformUrl(item.path, currentRegion),
    }))

    transformedLinks[key] = {
      ...value,
      path,
      translatedSlugs,
    }
  }

  return transformedLinks
}
