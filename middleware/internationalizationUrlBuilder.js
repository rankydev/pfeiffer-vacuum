import { withoutTrailingSlash, withoutLeadingSlash } from 'ufo'
import consola from 'consola'

const logger = consola.withScope('internationalizationUrlBuilder')

export default async function (context) {
  if (!process.server) {
    return
  }

  const path = withoutLeadingSlash(withoutTrailingSlash(context.route.path))
  const defaultRegion = process.env.STORYBLOK_DEFAULT_REGION
  const regions = process.env.STORYBLOK_REGIONS
  const defaultLanguage = process.env.DEFAULT_LANGUAGE_CODE
  const languages = process.env.LANGUAGE_CODES

  logger.trace('path', path)

  const urlsSegments = path.split('/')
  let region = urlsSegments.shift()
  let language = urlsSegments.shift()

  // if the requested url contains a language code, then do nothing
  if (languages.includes(language) && regions.includes(region)) {
    logger.trace('CONTINUE: url contains correct parameters')
    return
  }

  if (!regions.includes(region)) {
    region = defaultRegion
  }

  if (!languages.includes(language)) {
    const acceptLanguage = context.req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substring(0, 2)

    logger.trace('acceptLanguage', acceptLanguage)

    language = languages.includes(acceptLanguage)
      ? acceptLanguage
      : defaultLanguage
  }

  const redirectUrl = `/${region}/${language}`

  logger.trace('redirect to', redirectUrl)
  return context.redirect(redirectUrl)
}
