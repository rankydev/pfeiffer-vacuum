import { withoutTrailingSlash, withoutLeadingSlash } from 'ufo'

export default async function (context) {
  console.log('ENTER middleware', context)
  if (context.isHMR) {
    // ignore if called from hot module replacement
    return
  }

  const path = withoutLeadingSlash(withoutTrailingSlash(context.route.path))
  const defaultLanguage = context.$cms.defaultLanguageCode
  const languages = await context.$cms.getLanguages()

  const urlsSegments = path.split('/')
  const region = urlsSegments.shift()

  // if the requested url contains a language code, then do nothing
  if (languages.includes(urlsSegments[0])) {
    return
  }

  let language = defaultLanguage
  if (process.server) {
    const acceptLanguage = context.req.headers['accept-language']
      .split(',')[0]
      .toLocaleLowerCase()
      .substring(0, 2)

    language = languages.includes(acceptLanguage)
      ? acceptLanguage
      : defaultLanguage
  }

  const redirectUrl = `/${region}/${language}/${urlsSegments.join('/')}`
  console.log('redirect to', redirectUrl)
  return context.redirect(redirectUrl)
}
