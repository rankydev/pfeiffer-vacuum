import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '~/stores/products/products.js'
import ProductCard from './ProductCard.vue'
import GenericCard from '~/components/atoms/GenericCard/GenericCard'
import { productID, product } from './ProductCard.stories.content.js'

let productStoreID = '128ee16d-cb90-45be-9986-c8006a5235e6_sample'

jest.mock('~/stores/products', () => {
  const { product } = require('./ProductCard.stories.content.js')
  const getProductById = () => product

  return {
    __esModule: true,
    useProductStore: () => ({ getProductById }),
  }
})

let wrapper

function createComponent(propsData = {}, { shallow = true } = {}) {
  // const stubs = {}
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    // stubs,
    propsData,
  }

  wrapper = shallow
    ? shallowMount(ProductCard, options)
    : mount(ProductCard, options)
}

// describe('ProductCard', () => {
//   describe('initial state', () => {
//     it('should render given the minimal setup', () => {
//       const propsData = { ...defaultProps() }
//     })
//   })
// })

describe('ProductCard', () => {
  it('should render empty component without warnings given no productId', () => {})
  it('should render all product data given a productId', () => {})
  it('should call getProductById given productId', () => {})

  // it('increments by amount', () => {
  //   const counter = useCounter()
  //   counter.increment(10)
  //   expect(counter.n).toBe(10)
  // })
})
