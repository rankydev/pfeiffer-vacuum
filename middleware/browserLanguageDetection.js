import { withoutTrailingSlash, withoutLeadingSlash } from 'ufo'
import consola from 'consola'
const logger = consola.withScope('browserLaguageDetection')

// @todo Review and eventually rework this with ticket: https://jira.diva-e.com/browse/PVWEB-596

export default async function (context) {
  logger.trace('ENTER middleware', context)
  if (context.isHMR) {
    logger.trace('CONTINUE: isHMR')
    // ignore if called from hot module replacement
    return
  }

  const path = withoutLeadingSlash(withoutTrailingSlash(context.route.path))
  const defaultLanguage = context.$cms.defaultLanguageCode
  const languages = await context.$cms.getLanguages()

  logger.trace('path', path)
  logger.trace('defaultLanguage', defaultLanguage)
  logger.trace('languages', languages)

  const urlsSegments = path.split('/')
  const region = urlsSegments.shift()

  // if the requested url contains a language code, then do nothing
  if (languages.includes(urlsSegments[0])) {
    logger.trace('CONTINUE: url contains a language code')
    return
  }

  let language = defaultLanguage

  logger.trace('process', process.server)
  if (process.server) {
    logger.trace('process.server')
    const acceptLanguage = context.req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substring(0, 2)

    logger.trace('acceptLanguage', acceptLanguage)

    language = languages.includes(acceptLanguage)
      ? acceptLanguage
      : defaultLanguage
  }

  const redirectUrl = `/${region}/${language}/${urlsSegments.join('/')}`
  logger.trace('redirect to', redirectUrl)
  return context.redirect(redirectUrl)
}
