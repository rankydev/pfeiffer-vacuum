export function transform(links, context) {
  const { regions, defaultRegion } = context.$cms
  const regionsArray = regions.split(',')

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
      path,
      translatedSlugs,
    }
  }

  return transformedLinks
}

function transformUrl(url, currentRegion, defaultRegion) {
  const urlsSegments = url.split('/').filter((segment) => segment !== '')
  const language = urlsSegments.shift()
  const region = urlsSegments.shift()
  const slug = urlsSegments.join('/')

  if (region === defaultRegion) {
    return `/${currentRegion}/${language}/${slug}`
  } else {
    return `/${region}/${language}/${slug}`
  }
}
