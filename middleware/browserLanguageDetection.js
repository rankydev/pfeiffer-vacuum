import { withoutTrailingSlash, withoutLeadingSlash } from 'ufo'

export default async function (context) {
  console.log('ENTER middleware', context)
  if (context.isHMR) {
    console.log('CONTINUE: isHMR')
    // ignore if called from hot module replacement
    return
  }

  const path = withoutLeadingSlash(withoutTrailingSlash(context.route.path))
  const defaultLanguage = context.$cms.defaultLanguageCode
  const languages = await context.$cms.getLanguages()

  console.log('path', path)
  console.log('defaultLanguage', defaultLanguage)
  console.log('languages', languages)

  const urlsSegments = path.split('/')
  const region = urlsSegments.shift()

  // if the requested url contains a language code, then do nothing
  if (languages.includes(urlsSegments[0])) {
    console.log('CONTINUE: url contains a language code')
    return
  }

  let language = defaultLanguage

  console.log('process', process.server)
  if (process.server) {
    console.log('process.server')
    const acceptLanguage = context.req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substring(0, 2)

    console.log('acceptLanguage', acceptLanguage)

    language = languages.includes(acceptLanguage)
      ? acceptLanguage
      : defaultLanguage
  }

  const redirectUrl = `/${region}/${language}/${urlsSegments.join('/')}`
  console.log('redirect to', redirectUrl)
  return context.redirect(redirectUrl)
}
