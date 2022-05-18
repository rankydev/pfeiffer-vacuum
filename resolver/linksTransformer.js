export function transform(links, context) {
  const defaultRegion = process.env.STORYBLOK_DEFAULT_REGION
  const regionsArray = process.env.STORYBLOK_REGIONS

  const urlsSegments = context.route.path
    .split('/')
    .filter((segment) => segment !== '')

  const currentRegion = regionsArray.includes(urlsSegments[0])
    ? urlsSegments.shift()
    : defaultRegion

  const transformedLinks = {}

  for (const [key, value] of Object.entries(links)) {
    const path = transformUrl(value.path, currentRegion, defaultRegion)
    const translatedSlugs = value.translatedSlugs.map((item) => ({
      ...item,
      path: transformUrl(item.path, currentRegion, defaultRegion),
    }))

    transformedLinks[key] = {
      ...value,
      path,
      translatedSlugs,
    }
  }

  return transformedLinks
}

function appendTrailingSlashIfRequired(url, append) {
  return append && !url.endsWith('/') ? url + '/' : url
}

function transformUrl(url, currentRegion, defaultRegion) {
  const isTrailingSlash = url.endsWith('/')
  const urlsSegments = url.split('/').filter((segment) => segment !== '')
  const language = urlsSegments.shift()
  const region = urlsSegments.shift()
  const slug = urlsSegments.join('/')

  if (region === defaultRegion) {
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
