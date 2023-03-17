import useMeta from './useMeta.js'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule
  return {
    __esModule: true,
    ...originalModule,
    useRoute: () => ref({ fullPath: '/full/path' }),
    useContext: () => ({
      $config: {
        baseURL: 'http://localhost:3000',
      },
      $imageService: {
        getResponsiveImageUrl: (val) => val,
      },
    }),
  }
})

const content = {
  title: 'title',
  seoDescription: 'seoDescription',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
}

describe('useMeta ', () => {
  describe('getMetaData ', () => {
    it('should set title and description', () => {
      const metaData = useMeta(content, '', []).getMetaData()
      expect(metaData.title).toBe('title')
      expect(metaData.meta).toContainEqual({
        hid: 'description',
        name: 'description',
        content: 'seoDescription',
      })
    })

    it('should set twitter information', () => {
      const localContent = {
        ...content,
        twitterTitle: 'twitterTitle',
        twitterDescription: 'twitterDescription',
        twitterImage: {
          originalFilename:
            '/global/api/cms/assets/f/144293/620x620/f06c366c4c/lithography.jpg',
        },
      }
      const metaData = useMeta(localContent, '', []).getMetaData()

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
        content:
          'http://localhost:3000/global/api/cms/assets/f/144293/620x620/f06c366c4c/lithography.jpg',
      })
    })

    it('should set open graph information', () => {
      const localContent = {
        ...content,
        ogTitle: 'ogTitle',
        ogDescription: 'ogDescription',
        ogImage: {
          originalFilename:
            '/global/api/cms/assets/f/144293/620x620/f06c366c4c/lithography.jpg',
        },
      }
      const metaData = useMeta(localContent, '', []).getMetaData()

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
        content:
          'http://localhost:3000/global/api/cms/assets/f/144293/620x620/f06c366c4c/lithography.jpg',
      })
    })

    it('should overwrite social media information', () => {
      const metaData = useMeta(content, '', []).getMetaData()

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
      const metaData = useMeta(content, '', []).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'http://localhost:3000/twitter_image.png',
      })
      expect(metaData.meta).toContainEqual({
        hid: 'og:image',
        name: 'og:image',
        content: 'http://localhost:3000/og_image.png',
      })
    })

    it('should set no-index and no-follow to robots', () => {
      const localContent = {
        ...content,
        noindex: true,
        nofollow: true,
      }

      const metaData = useMeta(localContent, '', []).getMetaData()

      expect(metaData.meta).toContainEqual({
        hid: 'robots',
        name: 'robots',
        content: 'noindex,nofollow',
      })
    })

    it('should add canonical', () => {
      const localContent = {
        ...content,
        canonical: 'canonicalLink',
      }

      const metaData = useMeta(localContent, '', []).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'canonical',
        href: 'canonicalLink',
      })
    })

    it('should get canonical from route', () => {
      const metaData = useMeta(content, '', []).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'canonical',
        href: 'http://localhost:3000/full/path',
      })
    })

    it('should get canonical for internal page', () => {
      const localContent = {
        ...content,
        canonical: '/internal/path',
      }

      const metaData = useMeta(localContent, '', []).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'canonical',
        href: 'http://localhost:3000/internal/path',
      })
    })

    it('should add hreflang for each language and default', () => {
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
        content,
        defaultSlug,
        translatedSlugs
      ).getMetaData()

      expect(metaData.link).toContainEqual({
        rel: 'alternate',
        hreflang: 'de',
        href: 'http://localhost:3000/de/slug',
      })
      expect(metaData.link).toContainEqual({
        rel: 'alternate',
        hreflang: 'it',
        href: 'http://localhost:3000/it/slug',
      })
      expect(metaData.link).toContainEqual({
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'http://localhost:3000/default/full/slug',
      })
    })
  })
})
