function appendTrailingSlashIfRequired(url, append) {
  return append && !url.endsWith('/') ? url + '/' : url
}

export function transform(links, context) {
  const transformedLinks = {}

  for (const [key, value] of Object.entries(links)) {
    const path = transformUrl(value.path, context)
    const translatedSlugs = value.translatedSlugs.map((item) => ({
      ...item,
      path: transformUrl(item.path, context),
    }))

    transformedLinks[key] = {
      ...value,
      path,
      translatedSlugs,
    }
  }

  return transformedLinks
}

export function transformUrl(url, context) {
  const { DEFAULT_REGION_CODE, CURRENT_REGION_CODE, baseURL } = context.$config

  const hasTrailingSlash = url.endsWith('/')
  const urlSegments = url.split('/').filter((segment) => segment !== '')
  const language = urlSegments.shift()
  const region = urlSegments.shift()
  const slug = urlSegments.join('/')

  // stay in the current region if region is the current or the default one
  if ([DEFAULT_REGION_CODE, CURRENT_REGION_CODE].includes(region)) {
    return appendTrailingSlashIfRequired(
      `/${language}/${slug}`,
      hasTrailingSlash
    )
    // set the absoulte url to the new region otherwise
  } else {
    return appendTrailingSlashIfRequired(
      `${baseURL}/${region}/${language}/${slug}`,
      hasTrailingSlash
    )
  }
}
