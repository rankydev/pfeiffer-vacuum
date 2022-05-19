import { withoutTrailingSlash, withoutLeadingSlash } from 'ufo'
import consola from 'consola'

const logger = consola.withScope('internationalizationUrlBuilder')

export default async function (context) {
  if (!process.server) {
    return
  }

  const path = withoutLeadingSlash(withoutTrailingSlash(context.route.path))

  const {
    REGION_CODES,
    DEFAULT_REGION_CODE,
    DEFAULT_LANGUAGE_CODE,
    LANGUAGE_CODES,
  } = context.$config

  logger.trace('path', path)

  const urlsSegments = path.split('/')
  let region = urlsSegments.shift() || undefined
  let language = urlsSegments.shift() || undefined

  // if the requested url contains a language code, then do nothing
  if (LANGUAGE_CODES.includes(language) && REGION_CODES.includes(region)) {
    logger.trace('CONTINUE: url contains correct parameters')
    return
  }

  if (!REGION_CODES.includes(region)) {
    region = DEFAULT_REGION_CODE
  }

  if (!LANGUAGE_CODES.includes(language)) {
    const acceptLanguage = context.req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substring(0, 2)

    logger.trace('acceptLanguage', acceptLanguage)

    language = LANGUAGE_CODES.includes(acceptLanguage)
      ? acceptLanguage
      : DEFAULT_LANGUAGE_CODE
  }

  const redirectUrl = `/${region}/${language}`

  logger.trace('redirect to', redirectUrl)
  return context.redirect(redirectUrl)
}
