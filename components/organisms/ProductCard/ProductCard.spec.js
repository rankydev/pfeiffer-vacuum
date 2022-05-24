import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'

let productID

const defaultProps = () => ({
  productID: '',
})

let wrapper

function createComponent(propsData = {}, { shallow = true } = {}) {
  const stubs = {}
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallow
    ? shallowMount(ProductCard, options)
    : mount(ProductCard, options)
}

describe('ProductCard', () => {
  describe('initial state', () => {
    it('should render given the minimal setup', () => {
      const propsData = { ...defaultProps() }
    })
  })
})
