import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ProductCard from './ProductCard.vue'
import { product } from './ProductCard.stories.content.js'
import { describe } from '@jest/globals'

let wrapper

function createComponent(propsData = {}) {
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

  wrapper = shallowMount(ProductCard, options)
}

describe('ProductCard', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
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
  })
})
