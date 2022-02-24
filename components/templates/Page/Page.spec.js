import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueMeta from 'vue-meta'
import Page from './Page.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})
localVue.use(VueMeta, { keyName: 'head' })

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
        $imageService: {
          getResponsiveImageUrl: function () {
            return ''
          },
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
    describe('given content is set', () => {
      // TODO Test html
      xit('should render components', () => {
        const propsData = {
          content: {
            template: {
              content: {
                top: [
                  {
                    component: 'Top',
                  },
                ],
                header: [
                  {
                    component: 'Header',
                  },
                ],
                stage: [
                  {
                    component: 'Stage',
                  },
                ],
                body: [
                  {
                    component: 'Body',
                  },
                ],
                bottom: [
                  {
                    component: 'Bottom',
                  },
                ],
                footer: [
                  {
                    component: 'Footer',
                  },
                ],
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
      it('should use composable and set head tags', () => {
        const propsData = {
          content: {
            title: 'title',
            seoDescription: 'seoDescription',
            ogTitle: 'ogTitle',
            ogDescription: 'ogDescription',
            ogImage: {
              filename: '',
            },
            twitterTitle: 'twitterTitle',
            twitterDescription: 'twitterDescription',
            twitterImage: {
              filename: '',
            },
            noindex: true,
            nofollow: true,
            canonical: 'canonical',
          },
        }
        createComponent(propsData)
        const metaInfo = wrapper.vm.$meta().refresh().metaInfo
        expect(metaInfo.title).toBe('title')
        expect(metaInfo.meta).toContainEqual({
          hid: 'description',
          name: 'description',
          content: 'seoDescription',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'twitterTitle',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'twitterDescription',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'twitter:image',
          name: 'twitter:image',
          content: '/twitter_image.png',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'og:title',
          name: 'og:title',
          content: 'ogTitle',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'og:description',
          name: 'og:description',
          content: 'ogDescription',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'og:image',
          name: 'og:image',
          content: '/og_image.png',
        })
        expect(metaInfo.meta).toContainEqual({
          hid: 'robots',
          name: 'robots',
          content: 'noindex,nofollow',
        })
        expect(metaInfo.link).toContainEqual({
          rel: 'canonical',
          href: 'canonical',
        })
      })
    })
  })
})
