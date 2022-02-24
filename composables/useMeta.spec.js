import useMeta from './useMeta.js'

describe('useMeta ', () => {
  function createContext(context = {}) {
    return {
      root: {
        $config: {
          baseURL: '',
        },
        $route: {
          fullPath: '',
        },
        ...context,
      },
    }
  }

  function createContent(content = {}) {
    return {
      value: {
        ...content,
      },
    }
  }

  describe('getMetaData ', () => {
    it('should set title and description', () => {
      const content = {
        title: 'title',
        seoDescription: 'seoDescription',
      }
      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext()
      ).getMetaData()
      expect(metaData.title).toBe('title')
      expect(metaData.meta).toContainEqual({
        hid: 'description',
        name: 'description',
        content: 'seoDescription',
      })
    })

    it('should set twitter information', () => {
      const content = {
        twitterTitle: 'twitterTitle',
        twitterDescription: 'twitterDescription',
        twitterImage: {
          filename: 'filename',
        },
      }
      const context = {
        $imageService: {
          getResponsiveImageUrl: function () {
            return 'twitterImage'
          },
        },
      }

      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext(context)
      ).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'twitterTitle',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'twitterDescription',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https:twitterImage',
      })
    })

    it('should set open graph information', () => {
      const content = {
        ogTitle: 'ogTitle',
        ogDescription: 'ogDescription',
        ogImage: {
          filename: 'filename',
        },
      }
      const context = {
        $imageService: {
          getResponsiveImageUrl: function () {
            return 'ogImage'
          },
        },
      }
      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext(context)
      ).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'og:title',
        name: 'og:title',
        content: 'ogTitle',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'og:description',
        name: 'og:description',
        content: 'ogDescription',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'og:image',
        name: 'og:image',
        content: 'https:ogImage',
      })
    })

    it('should overwrite social media information', () => {
      const content = {
        title: 'title',
        seoDescription: 'seoDescription',
      }

      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext()
      ).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'title',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'seoDescription',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'og:title',
        name: 'og:title',
        content: 'title',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'og:description',
        name: 'og:description',
        content: 'seoDescription',
      })
    })

    it('should use twitter and open graph fallback images', () => {
      const context = {
        $config: {
          baseURL: 'fallback',
        },
      }

      const metaData = useMeta(
        createContent(),
        '',
        [],
        createContext(context)
      ).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'fallback/twitter_image.png',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'og:image',
        name: 'og:image',
        content: 'fallback/og_image.png',
      })
    })

    it('should set no-index and no-follow to robots', () => {
      const content = {
        noindex: true,
        nofollow: true,
      }
      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext()
      ).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'robots',
        name: 'robots',
        content: 'noindex,nofollow',
      })
    })

    it('should add canonical', () => {
      const content = {
        canonical: 'canonicalLink',
      }

      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext()
      ).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'canonical',
        href: 'canonicalLink',
      })
    })

    it('should get canonical from route', () => {
      const context = {
        $config: {
          baseURL: 'local',
        },
        $route: {
          fullPath: '/full/path',
        },
      }

      const metaData = useMeta(
        createContent(),
        '',
        [],
        createContext(context)
      ).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'canonical',
        href: 'local/full/path',
      })
    })

    it('should get canonical for internal page', () => {
      const content = {
        canonical: '/internal/path',
      }
      const context = {
        $config: {
          baseURL: 'local',
        },
      }

      const metaData = useMeta(
        createContent(content),
        '',
        [],
        createContext(context)
      ).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'canonical',
        href: 'local/internal/path',
      })
    })

    it('should add hreflang for each language and default', () => {
      const context = {
        $config: {
          baseURL: 'local',
        },
      }
      const defaultSlug = 'default/full/slug'
      const translatedSlugs = [
        {
          lang: 'de',
          path: 'de/slug',
        },
        {
          lang: 'it',
          path: 'it/slug',
        },
      ]
      const metaData = useMeta(
        createContent(),
        defaultSlug,
        translatedSlugs,
        createContext(context)
      ).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'alternate',
        hreflang: 'de',
        href: 'local/de/slug',
      })
      expect(metaData.link).toContainEqual({
        rel: 'alternate',
        hreflang: 'it',
        href: 'local/it/slug',
      })
      expect(metaData.link).toContainEqual({
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'local/default/full/slug',
      })
    })
  })
})
