import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '~/stores/products/products'
import ProductCard from './ProductCard.vue'
import { product, productID } from './ProductCard.stories.content.js'

jest.mock('~/stores/products', () => {
  const { product } = require('./ProductCard.stories.content.js')
  const getProductById = () => product

  return {
    __esModule: true,
    useProductStore: () => ({ getProductById }),
  }
})

let wrapper

function createComponent(propsData = {}, shallow = true) {
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
    stubs: {
      GenericCard: true,
      ResponsiveImage: true,
    },
  }

  wrapper = shallow
    ? shallowMount(ProductCard, options)
    : mount(ProductCard, options)
}

describe('ProductCard', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('should render empty component without warnings given no productId', () => {
    createComponent({})
    const ProductCardWrapper = wrapper.find('genericcard-stub')
    expect(ProductCardWrapper.vm).toBeTruthy()
  })
  it('should render product data given a productId', () => {
    createComponent({
      product: { code: product.code, name: product.name },
    })
    expect(wrapper.text()).toContain(product.categories[0].name)
    expect(wrapper.find('span').text()).toBe(product.name)
    expect(wrapper.find('p').text()).toBe(product.description)
  })
  it('should call getProductById given productId', () => {
    const productStore = useProductStore()
    expect(productStore).toBeTruthy()
    const storeProduct = productStore.getProductById(productID)
    expect(storeProduct).toBeTruthy()
    const storeProducts = productStore.getAllProducts
    expect(storeProducts).toBeTruthy()
  })
})
