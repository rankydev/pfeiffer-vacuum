import { shallowMount, createLocalVue } from '@vue/test-utils'
import Page from './Page.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('Page', () => {
  let wrapper
  function createComponent(propsData = {}, { mocks, provide } = {}) {
    wrapper = shallowMount(Page, {
      localVue,
      propsData: {
        content: {
          template: {},
        },
        ...propsData,
      },
      mocks: {
        $config: {
          baseURL: '',
        },
        $route: {
          fullPath: '',
        },
        ...mocks,
      },
      provide: {
        getTranslatedSlugs() {
          return ''
        },
        getDefaultFullSlug() {
          return ''
        },
        ...provide,
      },
    })
  }

  describe('initial state', () => {
    describe('given template is set', () => {
      it('should inherit template values', () => {
        const propsData = {
          content: {
            template: {
              content: {
                top: {},
                header: {},
                stage: {},
                body: {},
                bottom: {},
                footer: {},
              },
            },
          },
        }
        createComponent(propsData)
        expect(wrapper.vm.top).toBeDefined()
        expect(wrapper.vm.header).toBeDefined()
        expect(wrapper.vm.stage).toBeDefined()
        expect(wrapper.vm.body).toBeDefined()
        expect(wrapper.vm.bottom).toBeDefined()
        expect(wrapper.vm.footer).toBeDefined()
      })
    })
    describe('given header information are set', () => {
      it('should create title and description', () => {
        const propsData = {
          content: {
            title: 'title',
            seoDescription: 'seoDescription',
          },
        }
        createComponent(propsData)
        expect(wrapper.vm.metaData.title).toBe('title')
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'description',
          name: 'description',
          content: 'seoDescription',
        })
      })
      it('should overwrite title by set seoTitle', () => {
        const propsData = {
          content: {
            title: 'title',
            seoTitle: 'seoTitle',
          },
        }
        createComponent(propsData)
      })
      it('should set twitter information', () => {
        const propsData = {
          content: {
            twitterTitle: 'twitterTitle',
            twitterDescription: 'twitterDescription',
            twitterImage: {
              filename: 'filename',
            },
          },
        }
        const mocks = {
          mocks: {
            $imageService: {
              getResponsiveImageUrl: function () {
                return 'twitterImage'
              },
            },
          },
        }
        createComponent(propsData, mocks)
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'twitterTitle',
        })
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'twitterDescription',
        })
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https:twitterImage',
        })
      })
      it('should overwrite twitter information', () => {
        const propsData = {
          content: {
            title: 'title',
            seoDescription: 'seoDescription',
          },
        }
        createComponent(propsData)
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'title',
        })
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'seoDescription',
        })
      })
      it('should set open graph information', () => {
        const propsData = {
          content: {
            ogTitle: 'ogTitle',
            ogDescription: 'ogDescription',
            ogImage: {
              filename: 'filename',
            },
          },
        }
        const mocks = {
          mocks: {
            $imageService: {
              getResponsiveImageUrl: function () {
                return 'ogImage'
              },
            },
          },
        }
        createComponent(propsData, mocks)
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'og:title',
          name: 'og:title',
          content: 'ogTitle',
        })
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'og:description',
          name: 'og:description',
          content: 'ogDescription',
        })
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'og:image',
          name: 'og:image',
          content: 'https:ogImage',
        })
      })
      it('should overwrite open graph information', () => {
        const propsData = {
          content: {
            title: 'title',
            seoDescription: 'seoDescription',
          },
        }
        createComponent(propsData)
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'og:title',
          name: 'og:title',
          content: 'title',
        })
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'og:description',
          name: 'og:description',
          content: 'seoDescription',
        })
      })
      it('should use twitter and open graph fallback images', () => {
        const mocks = {
          mocks: {
            $config: {
              baseURL: 'fallback',
            },
          },
        }
        createComponent({}, mocks)
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'og:image',
          name: 'og:image',
          content: 'fallback/og_image.png',
        })
      })
      it('should set no-index and no-follow to robots', () => {
        const propsData = {
          content: {
            noindex: true,
            nofollow: true,
          },
        }
        createComponent(propsData)
        expect(wrapper.vm.metaData.meta).toContainEqual({
          hid: 'robots',
          name: 'robots',
          content: 'noindex,nofollow',
        })
      })
      it('should add canonical', () => {
        const propsData = {
          content: {
            canonical: 'canonicalLink',
          },
        }
        createComponent(propsData)
        expect(wrapper.vm.metaData.link).toContainEqual({
          rel: 'canonical',
          href: 'canonicalLink',
        })
      })
      it('should get canonical from route', () => {
        const mocks = {
          mocks: {
            $config: {
              baseURL: 'local',
            },
            $route: {
              fullPath: '/full/path',
            },
          },
        }
        createComponent(undefined, mocks)
        expect(wrapper.vm.metaData.link).toContainEqual({
          rel: 'canonical',
          href: 'local/full/path',
        })
      })
      it('should get canonical for internal page', () => {
        const propsData = {
          content: {
            canonical: '/internal/path',
          },
        }
        const mocks = {
          mocks: {
            $config: {
              baseURL: 'local',
            },
          },
        }
        createComponent(propsData, mocks)
        expect(wrapper.vm.metaData.link).toContainEqual({
          rel: 'canonical',
          href: 'local/internal/path',
        })
      })
      it('should add hreflang for each language and default', () => {
        const conf = {
          mocks: {
            $config: {
              baseURL: 'local',
            },
          },
          provide: {
            getTranslatedSlugs() {
              return [
                {
                  lang: 'de',
                  path: 'de/slug',
                },
                {
                  lang: 'it',
                  path: 'it/slug',
                },
              ]
            },
            getDefaultFullSlug() {
              return 'default/full/slug'
            },
          },
        }
        createComponent(undefined, conf)
        expect(wrapper.vm.metaData.link).toContainEqual({
          rel: 'alternate',
          hreflang: 'de',
          href: 'local/de/slug',
        })
        expect(wrapper.vm.metaData.link).toContainEqual({
          rel: 'alternate',
          hreflang: 'it',
          href: 'local/it/slug',
        })
        expect(wrapper.vm.metaData.link).toContainEqual({
          rel: 'alternate',
          hreflang: 'x-default',
          href: 'local/default/full/slug',
        })
      })
    })
  })
})
