import CategoryPage from './CategoryPage.vue'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation.vue'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import header from '~/components/organisms/Header/Header.stories.content'
import { OnPageNavigationContent } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content'
import VueMeta from 'vue-meta'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})
localVue.use(VueMeta, { keyName: 'head' })

jest.mock('~/stores/category', () => {
  return {
    __esModule: true,
    useCategoryStore: () => {
      return {
        headline: 'Test',
        link: [],
        count: 21,
      }
    },
  }
})

describe('CategoryPage', () => {
  let wrapper
  function createComponent(propsData = {}, { provide } = {}) {
    wrapper = shallowMount(CategoryPage, {
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
      },
      stubs: {
        NuxtDynamic: true,
      },
      provide: {
        ...provide,
      },
    })
  }

  describe('initial state', () => {
    const propsData = {
      content: {
        header: [header],
        quicklinks: [OnPageNavigationContent],
        body: [],
        footer: [footerContent],
        component: 'CategoryPage',
      },
    }
    createComponent(propsData)

    test('should render page correctly given props', () => {
      const sections = wrapper.findAll('nuxtdynamic-stub')

      expect(wrapper.exists()).toBeTruthy()
      expect(sections).toHaveLength(2)
    })

    test('should render OnPageNavigation correctly given props', () => {
      const onPageNavigation = wrapper.findComponent(OnPageNavigation)

      expect(onPageNavigation.vm.quicklinks).toBe(
        OnPageNavigationContent.quicklinks
      )
    })

    test('should render ResultHeadline correctly given props', () => {
      const resultHeadline = wrapper.findComponent(ResultHeadline)

      expect(resultHeadline.exists()).toBeTruthy()
    })
    describe('given content is set', () => {
      it('should render components', () => {
        const propsData = {
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
        }
        createComponent(propsData)
        const sections = wrapper.findAll('nuxtdynamic-stub')

        expect(sections.at(0).attributes('component')).toBe(
          propsData.content.top[0].component
        )
        expect(sections.at(1).attributes('component')).toBe(
          propsData.content.header[0].component
        )
        expect(sections.at(2).attributes('component')).toBe(
          propsData.content.bottom[0].component
        )
        expect(sections.at(3).attributes('component')).toBe(
          propsData.content.footer[0].component
        )
      })
    })
  })
})
