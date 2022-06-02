import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '~/stores/products/products.js'
import ProductCard from './ProductCard.vue'
import { productID } from './ProductCard.stories.content.js'

let productID = '128ee16d-cb90-45be-9986-c8006a5235e6_sample'

// const defaultProps = () => ({
//   productID: '128ee16d-cb90-45be-9986-c8006a5235e6_sample',
// })

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

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('product', () => {
    createComponent(propsData)
    const store = useProductStore()
    // expect(counter.n).toBe(0)
    const product = store.getProductById(productID)
    // expect(counter.n).toBe(1)
    console.log(product)
    console.log()
  })

  // it('increments by amount', () => {
  //   const counter = useCounter()
  //   counter.increment(10)
  //   expect(counter.n).toBe(10)
  // })
})
