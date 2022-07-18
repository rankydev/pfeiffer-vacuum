import { createLocalVue, shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import productCardCarouselContent from './ProductCardCarousel.stories.content'
import ProductCardCarousel from './ProductCardCarousel'

const mockFetch = jest.fn()
const mockGetById = () => {}

jest.mock('~/stores/products/products', () => {
  const {
    product,
  } = require('../../molecules/ProductCard/ProductCard.stories.content.js')
  const originalModule = jest.requireActual('@nuxtjs/composition-api')

  const mockKey = '' + Math.random()

  return {
    __esModule: true,
    useProductStore: () => ({
      products: [product, product, product],
      fetchProducts: mockFetch,
      getProductById: mockGetById,
    }),
    useAsync: (cb) => originalModule.useAsync(cb, mockKey),
  }
})

let wrapper

const nuxtDynamicStub = {
  template: '<div />',
}

function createComponent(propsData = {}) {
  const stubs = {
    Template: true,
    NuxtDynamic: nuxtDynamicStub,
  }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(ProductCardCarousel, options)
}

describe('ProductCardCarousel', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should render ProductCardCarousel when no entries are provided', () => {
      createComponent()

      const productCardCarouselWrapper = wrapper.find('.product-card-carousel')
      const carousel = wrapper.find('contentcarousel-stub')

      expect(productCardCarouselWrapper.exists()).toBeTruthy()
      expect(carousel.exists()).toBeFalsy()
    })

    test('should render ContentCarousel when products have been fetched from api', () => {
      createComponent(productCardCarouselContent)

      const carousel = wrapper.find('contentcarousel-stub')

      console.log(wrapper.vm.products)

      expect(carousel.exists()).toBeTruthy()
    })
  })
})
