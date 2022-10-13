import CategoryPage from './CategoryPage.vue'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation.vue'
import Button from '~/components/atoms/Button/Button'
import { shallowMount } from '@vue/test-utils'
import { OnPageNavigationContent } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content'
import { setResult, setRouteParams, setLang } from '@nuxtjs/composition-api'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  let data = []
  const query = jest.fn().mockReturnValue(Promise.resolve({ data: [] }))
  const route = ref({ params: { category: '' } })
  const i18n = { locale: 'en' }

  const $config = {
    CURRENT_REGION_CODE: 'global',
    DEFAULT_REGION_CODE: 'global',
    DEFAULT_LANGUAGE_CODE: 'en',
    baseURL: 'example.com',
  }

  return {
    __esModule: true,
    ...originalModule,
    useContext: jest.fn(() => ({ $cms: { query }, route, i18n, $config })),
    ssrRef: ref,
    setResult: (res) => query.mockReturnValue(Promise.resolve({ data: res })),
    setRouteParams: (params) => (route.value.params = params),
    setLang: (lang) => (i18n.locale = lang),
    getMockQuery: () => query,
  }
})

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

  function createComponent(propsData = {}) {
    wrapper = shallowMount(CategoryPage, {
      propsData: {
        content: {
          quicklinks: [OnPageNavigationContent],
        },
        ...propsData,
      },
    })
  }

  describe('initial state', () => {
    test('should render OnPageNavigation correctly given props', () => {
      createComponent()
      const onPageNavigation = wrapper.findComponent(OnPageNavigation)

      expect(onPageNavigation.vm.quicklinks).toBe(
        OnPageNavigationContent.quicklinks
      )
    })

    test('should render a button to category content page given a valid result', async () => {
      const region = 'global'
      const slug = 'some-slug'
      const params = { category: 'some-id' }
      const result = [{ full_slug: `${region}/${slug}` }]
      setRouteParams(params)
      setResult(result)

      createComponent()
      // server response tick
      await wrapper.vm.$nextTick()
      // rerender tick
      await wrapper.vm.$nextTick()

      const domButton = wrapper.findComponent(Button)

      expect(domButton.exists()).toBeTruthy()
      expect(domButton.vm.href).toBe(`/en/${slug}`)
    })

    test('should render no button to category content page given no category route param', async () => {
      const region = 'global'
      const slug = 'some-slug'
      const params = {}
      const result = [{ full_slug: `${region}/${slug}` }]
      setRouteParams(params)
      setResult(result)

      createComponent()
      // server response tick
      await wrapper.vm.$nextTick()
      // rerender tick
      await wrapper.vm.$nextTick()

      const domButton = wrapper.findComponent(Button)

      expect(domButton.exists()).toBeFalsy()
    })

    test('should render no button to category content page given no result', async () => {
      const params = { category: 'some-id' }
      const result = []
      setRouteParams(params)
      setResult(result)

      createComponent()
      // server response tick
      await wrapper.vm.$nextTick()
      // rerender tick
      await wrapper.vm.$nextTick()

      const domButton = wrapper.findComponent(Button)

      expect(domButton.exists()).toBeFalsy()
    })
  })
})
