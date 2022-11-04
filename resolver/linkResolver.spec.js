import { describe, expect, test } from '@jest/globals'
import { render } from './linkResolver'

const $storyblok = { linksWithTrailingSlash: false }
const context = { i18n: { locale: 'en' } }

const links = {
  linkId: {
    path: '/en/some-link-path',
    translatedSlugs: [
      { lang: 'zh', path: '/zh/some-link-path' },
      { lang: 'de', path: '/de/some-link-path' },
      { lang: 'ko', path: '/ko/some-link-path' },
    ],
  },
  otherLinkId: {
    path: '/en/some-other-link-path',
    translatedSlugs: [],
  },
}

const emailLink = {
  linktype: 'email',
  email: 'max@example.com',
}

const otherLink = {
  linktype: 'other',
  cached_url: 'www.example.com',
}

const storyLink = {
  id: 'linkId',
  linktype: 'story',
  cached_url: '/some-url',
}

describe('linkResolver', () => {
  test('should return a mailto tag, given an linktype email', () => {
    const node = emailLink
    const result = render({ node, $storyblok, links, context })

    expect(result).toBe(`mailto:${emailLink.email}`)
  })

  test('should return the cached url given a different linktype than emil or story', () => {
    const node = otherLink
    const result = render({ node, $storyblok, links, context })

    expect(result).toBe(otherLink.cached_url)
  })

  describe('given the linktype story', () => {
    test('should return an empty string given no id', () => {
      const node = { ...storyLink, id: undefined }
      const result = render({ node, $storyblok, links, context })

      expect(result).toBe('')
    })

    describe('given an existing id', () => {
      describe('given a lang', () => {
        test('should return a localized link when translated slug was found', () => {
          const node = storyLink
          const lang = 'de'
          const result = render({ node, $storyblok, links, lang, context })

          expect(result).toBe('/de/some-link-path')
        })

        test('should return the links path when slug was not found', () => {
          const node = storyLink
          const lang = 'unknown'
          const result = render({ node, $storyblok, links, lang, context })

          expect(result).toBe(links.linkId.path)
        })
      })

      test('should return the links path given no lang', () => {
        const node = storyLink
        const result = render({ node, $storyblok, links, context })

        expect(result).toBe(links.linkId.path)
      })
    })

    describe('given an non existing id', () => {
      test('should return page not found', () => {
        const node = { ...storyLink, id: 'unknownId' }
        const result = render({ node, $storyblok, links, context })

        expect(result).toBe(`/${context.i18n.locale}/page-not-found-404`)
      })

      test('should return / if given an emtpy cached_url', () => {
        const node = { ...storyLink, id: 'unknownId', cached_url: '' }
        const result = render({ node, $storyblok, links, context })

        expect(result).toBe('/')
      })
    })

    test('should add query params when they include peview tag', () => {
      process.client = true

      const search = '?_storyblok=123456'
      const url = new URL(`https://www.example.com${search}`)

      // create location mock
      const location = window.location
      delete window.location
      window.location = url

      const node = storyLink
      const result = render({ node, $storyblok, links, context })

      // reset location mock
      delete window.location
      window.location = location

      expect(result).toBe(`${links.linkId.path}${search}`)
    })

    test('should add anchor when provided', () => {
      const node = { ...storyLink, anchor: 'some-anchor' }
      const result = render({ node, $storyblok, links, context })

      expect(result).toBe(`${links.linkId.path}#${node.anchor}`)
    })

    test('should add a trailing slash given withTralingSlash true', () => {
      const node = storyLink
      const $storyblok = { linksWithTrailingSlash: true }
      const result = render({ node, $storyblok, links, context })

      expect(result).toBe(`${links.linkId.path}/`)
    })
  })
})
