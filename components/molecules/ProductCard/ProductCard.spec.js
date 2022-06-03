import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useProductStore } from '~/stores/products/products'
// import { useProductStore } from '~/stores/products/products.js'
import ProductCard from './ProductCard.vue'

// jest.mock('~/stores/products', () => {
//   const { product } = require('./ProductCard.stories.content.js')
//   const getProductById = () => product

//   return {
//     __esModule: true,
//     useProductStore: () => ({ getProductById }),
//   }
// })

let wrapper

function createComponent(propsData = {}, { shallow = true } = {}) {
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
  }

  // wrapper = shallowMount(ProductCard, options)

  wrapper = shallow
    ? shallowMount(ProductCard, options)
    : mount(ProductCard, options)
  // wrapper = shallowMount(ProductCard, options)
}

// describe('ProductCard', () => {
//   describe('initial state', () => {
//     it('should render given the minimal setup', () => {
//       const propsData = { ...defaultProps() }
//     })
//   })
// })

describe('ProductCard', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('should render empty component without warnings given no productId', () => {
    createComponent()
    // const ProductCardWrapper = wrapper.find('GenericCard')
    // console.log(ProductCardWrapper)
    // expect(wrapper.vm).toBeTruthy()
  })
  it('should render all product data given a productId', () => {})
  it('should call getProductById given productId', () => {})

  // it('increments by amount', () => {
  //   const counter = useCounter()
  //   counter.increment(10)
  //   expect(counter.n).toBe(10)
  // })
})
