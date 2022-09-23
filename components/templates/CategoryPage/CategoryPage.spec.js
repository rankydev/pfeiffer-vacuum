import CategoryPage from './CategoryPage.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import header from '~/components/organisms/Header/Header.stories.content'
import { OnPageNavigation } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content'
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
    test('should render page correctly', () => {
      const propsData = {
        content: {
          header: [header],
          quicklinks: [OnPageNavigation],
          body: [],
          footer: [footerContent],
          component: 'CategoryPage',
        },
      }
      createComponent(propsData)
    })
  })
})
