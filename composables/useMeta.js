const useMeta = (
  { value: content },
  defaultSlug,
  translatedSlugs,
  { root: context }
) => {
  const getMetaData = () => {
    const { title, seoTitle, seoDescription } = content
    const meta = []
    const link = []

    const _seoTitle = seoTitle || title

    meta.push({
      hid: 'description',
      name: 'description',
      content: seoDescription,
    })
    const baseUrl = context.$config.baseURL

    addOpenGraph(
      meta,
      content,
      _seoTitle,
      seoDescription,
      baseUrl,
      context.$imageService
    )
    addTwitter(
      meta,
      content,
      _seoTitle,
      seoDescription,
      baseUrl,
      context.$imageService
    )

    addRobots(meta, content)

    const routeFullPath = context.$route.fullPath
    addCanonical(link, content, baseUrl, routeFullPath)

    addHreflang(link, defaultSlug, translatedSlugs, baseUrl)

    return {
      title,
      meta,
      link,
    }
  }

  return {
    getMetaData,
  }
}

export default useMeta

function getImageUrl(image, fallbackImageUrl, width, height, imageService) {
  return image && image.filename
    ? 'https:' +
        imageService.getResponsiveImageUrl(
          image.filename,
          width,
          height,
          'jpeg'
        )
    : fallbackImageUrl
}

function addOpenGraph(
  meta,
  content,
  fallbackTitle,
  fallbackDescription,
  baseUrl,
  imageService
) {
  const { ogTitle, ogDescription, ogImage } = content
  const ogFallbackImage = baseUrl + '/og_image.png'

  meta.push({
    hid: 'og:title',
    name: 'og:title',
    content: ogTitle || fallbackTitle,
  })
  meta.push({
    hid: 'og:description',
    name: 'og:description',
    content: ogDescription || fallbackDescription,
  })
  meta.push({
    hid: 'og:image',
    name: 'og:image',
    content: getImageUrl(ogImage, ogFallbackImage, 1200, 630, imageService),
  })
}

function addTwitter(
  meta,
  content,
  fallbackTitle,
  fallbackDescription,
  baseUrl,
  imageService
) {
  const { twitterTitle, twitterDescription, twitterImage } = content
  const twitterFallbackImage = baseUrl + '/twitter_image.png'

  meta.push({
    hid: 'twitter:title',
    name: 'twitter:title',
    content: twitterTitle || fallbackTitle,
  })
  meta.push({
    hid: 'twitter:description',
    name: 'twitter:description',
    content: twitterDescription || fallbackDescription,
  })
  meta.push({
    hid: 'twitter:image',
    name: 'twitter:image',
    content: getImageUrl(
      twitterImage,
      twitterFallbackImage,
      280,
      150,
      imageService
    ),
  })
}

function addRobots(meta, { noindex, nofollow }) {
  const robotsContent = []
  if (noindex) {
    robotsContent.push('noindex')
  }
  if (nofollow) {
    robotsContent.push('nofollow')
  }

  if (robotsContent.length) {
    meta.push({
      hid: 'robots',
      name: 'robots',
      content: robotsContent.join(','),
    })
  }
}

function addCanonical(link, { canonical = '' }, baseUrl, routeFullPath) {
  if (canonical === '' || canonical === '/') {
    link.push({ rel: 'canonical', href: baseUrl + routeFullPath })
    return
  }

  if (canonical.startsWith('/')) {
    link.push({ rel: 'canonical', href: baseUrl + canonical })
  } else {
    link.push({ rel: 'canonical', href: canonical })
  }
}

function addHreflang(link, defaultSlug, translatedSlugs = [], baseUrl) {
  if (!Array.isArray(translatedSlugs) || !translatedSlugs?.length) {
    return
  }

  for (const { lang, path } of translatedSlugs) {
    link.push({ rel: 'alternate', hreflang: lang, href: `${baseUrl}/${path}` })
  }

  link.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}/${defaultSlug}`,
  })
}
