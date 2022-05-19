import { withoutTrailingSlash, withoutLeadingSlash } from 'ufo'
import consola from 'consola'

const logger = consola.withScope('internationalizationUrlBuilder')

export default async function (context) {
  if (!process.server) {
    return
  }

  const path = withoutLeadingSlash(withoutTrailingSlash(context.route.path))

  const REGIONS = (process.env.STORYBLOK_REGIONS || '').split(',')
  const DEFAULT_REGION = process.env.STORYBLOK_DEFAULT_REGION || ''
  const LANGUAGES = (process.env.LANGUAGE_CODES || '').split(',')
  const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE_CODE || ''

  const isEmpty = (ele) => (ele?.length || 0) === 0
  const processEnvs = [REGIONS, DEFAULT_REGION, LANGUAGES, DEFAULT_LANGUAGE]

  if (processEnvs.some(isEmpty)) {
    console.error(
      'InternationalizationUrlBuilder: Empty process env',
      processEnvs.join(', ')
    )
    return
  }

  logger.trace('path', path)

  const urlsSegments = path.split('/')
  let region = urlsSegments.shift()
  let language = urlsSegments.shift()

  // if the requested url contains a language code, then do nothing
  if (LANGUAGES.includes(language) && REGIONS.includes(region)) {
    logger.trace('CONTINUE: url contains correct parameters')
    return
  }

  if (!REGIONS.includes(region)) {
    region = DEFAULT_REGION
  }

  if (!LANGUAGES.includes(language)) {
    const acceptLanguage = context.req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substring(0, 2)

    logger.trace('acceptLanguage', acceptLanguage)

    language = LANGUAGES.includes(acceptLanguage)
      ? acceptLanguage
      : DEFAULT_LANGUAGE
  }

  const redirectUrl = `/${region}/${language}`

  logger.trace('redirect to', redirectUrl)
  return context.redirect(redirectUrl)
}
