import { useContext, useRoute } from '@nuxtjs/composition-api'
import { useLogger } from './useLogger'
import _difference from 'lodash/difference'

const validateRequiredKeys = (keys, content) => {
  const { logger } = useLogger()
  const missingKeys = _difference(keys, Object.keys(content))

  if (missingKeys.length > 0) {
    logger.warn(`Missing following keys: ${missingKeys.join(', ')}`)
  }
}

const useMeta = (content = {}, defaultSlug, translatedSlugs) => {
  const context = useContext()
  const route = useRoute()

  const reqKeys = ['title', 'seoTitle', 'seoDescription']
  validateRequiredKeys(reqKeys, content)

  const getMetaData = () => {
    const { title, seoTitle, seoDescription } = content
    let meta = []
    const link = []

    const _seoTitle = seoTitle || title

    const baseUrl = context.$config.baseURL

    const opengraphMeta = addOpenGraph(
      content,
      _seoTitle,
      seoDescription,
      baseUrl,
      context.$imageService
    )
    const twitterMeta = addTwitter(
      content,
      _seoTitle,
      seoDescription,
      baseUrl,
      context.$imageService
    )

    const robotsMeta = addRobots(content)

    meta = [...opengraphMeta, ...twitterMeta, ...robotsMeta]

    meta.push({
      hid: 'description',
      name: 'description',
      content: seoDescription,
    })

    const routeFullPath = route.value.fullPath
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
  content,
  fallbackTitle,
  fallbackDescription,
  baseUrl,
  imageService
) {
  const reqKeys = ['ogTitle', 'ogDescription', 'ogImage']
  validateRequiredKeys(reqKeys, content)

  const { ogTitle, ogDescription, ogImage } = content
  const ogFallbackImage = baseUrl + '/og_image.png'
  const ogImageUrl = getImageUrl(
    ogImage,
    ogFallbackImage,
    1200,
    630,
    imageService
  )

  return [
    {
      hid: 'og:title',
      name: 'og:title',
      content: ogTitle || fallbackTitle,
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: ogDescription || fallbackDescription,
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: ogImageUrl,
    },
  ]
}

function addTwitter(
  content,
  fallbackTitle,
  fallbackDescription,
  baseUrl,
  imageService
) {
  const reqKeys = ['twitterTitle', 'twitterDescription', 'twitterImage']
  validateRequiredKeys(reqKeys, content)

  const { twitterTitle, twitterDescription, twitterImage } = content
  const twitterFallbackImage = baseUrl + '/twitter_image.png'
  const twitterImageUrl = getImageUrl(
    twitterImage,
    twitterFallbackImage,
    280,
    150,
    imageService
  )

  return [
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: twitterTitle || fallbackTitle,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: twitterDescription || fallbackDescription,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: twitterImageUrl,
    },
  ]
}

function addRobots({ noindex, nofollow }) {
  const robotsContent = [
    ...(noindex ? ['noindex'] : []),
    ...(nofollow ? ['nofollow'] : []),
  ]

  if (robotsContent.length > 0) {
    return [
      {
        hid: 'robots',
        name: 'robots',
        content: robotsContent.join(','),
      },
    ]
  }

  return []
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
