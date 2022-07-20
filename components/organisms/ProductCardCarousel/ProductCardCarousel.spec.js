import ProductCardCarousel from './ProductCardCarousel'
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { carouselEntries } from './ProductCardCarousel.stories.content'

let wrapper
const getProducts = jest.fn((e) => {
  return e
})

function createComponent(propsData = {}) {
  const localVue = createLocalVue()

  localVue.prototype.$nuxt = {
    context: {
      $hybrisApi: {
        productApi: {
          getProducts: getProducts,
        },
      },
    },
  }

  wrapper = shallowMount(ProductCardCarousel, {
    localVue,
    propsData,
  })
}

describe('ProductCardCarousel', () => {
  describe('initial state', () => {
    test('should render component without props', () => {
      createComponent()

      const carousel = wrapper.findComponent(ContentCarousel)
      expect(carousel.exists()).toBeFalsy()
      expect(getProducts).toBeCalledTimes(1)
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
