import ProductCardCarousel from './ProductCardCarousel.vue'
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
import { shallowMount } from '@vue/test-utils'
import { carouselEntries } from './ProductCardCarousel.stories.content'

let wrapper
const mockGetProducts = jest.fn((e) => {
  return e
})

jest.mock('~/stores/product', () => {
  return {
    useProductStore: () => {
      return {
        getProducts: mockGetProducts,
      }
    },
  }
})

function createComponent(propsData = {}) {
  wrapper = shallowMount(ProductCardCarousel, {
    propsData,
  })
}

describe('ProductCardCarousel', () => {
  describe('initial state', () => {
    test('should render component without props', () => {
      createComponent()

      const carousel = wrapper.findComponent(ContentCarousel)
      expect(carousel.exists()).toBeFalsy()
      expect(mockGetProducts).toBeCalledTimes(1)
    })

    test('should render component given slides', async () => {
      createComponent({ slides: carouselEntries })

      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      const carousel = wrapper.findComponent(ContentCarousel)
      expect(carousel.exists()).toBeTruthy()
      expect(wrapper.vm.enrichedSlides).toHaveLength(carouselEntries.length)
    })
  })
})
