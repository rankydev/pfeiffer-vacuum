import { createLocalVue, shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import productCardCarouselContent from './ProductCardCarousel.stories.content'
import ProductCardCarousel from './ProductCardCarousel'

jest.mock('~/stores/products', () => {
  const {
    product,
  } = require('../../molecules/ProductCard/ProductCard.stories.content.js')
  const originalModule = jest.requireActual('@nuxtjs/composition-api')

  return {
    __esModule: true,
    useProductStore: () => ({ products: [product, product, product] }),
    useAsync: (cb) => originalModule.useAsync(cb, key),
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
      // TODO: fix The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables. error
      const productCardCarouselWrapper = wrapper.find('.product-card-carousel')

      expect(productCardCarouselWrapper).toBeTruthy()
    })

    test('should render ContentCarousel when products have been fetched from api', () => {
      createComponent(productCardCarouselContent)
      // TODO add test
    })
  })
})
