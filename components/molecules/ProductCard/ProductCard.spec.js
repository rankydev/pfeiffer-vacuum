import { shallowMount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'
import { product } from './ProductCard.stories.content.js'

let wrapper

const GenericCard = {
  template: `<div>
  <div class="image"><slot name="image" /></div>
  <div class="subheading"><slot name="subheading" /></div>
  <div class="heading"><slot name="heading" /></div>
  <div class="description"><slot name="description" /></div>
    </div>`,
}

function createComponent(propsData = {}) {
  const options = {
    propsData,
    stubs: {
      GenericCard,
      ResponsiveImage: true,
    },
  }

  wrapper = shallowMount(ProductCard, options)
}

describe('ProductCard', () => {
  describe('initial state', () => {
    test('should render empty component without warnings given no product', () => {
      createComponent()

      const logSpy = jest.spyOn(console, 'log')
      const warnSpy = jest.spyOn(console, 'warn')
      const errSpy = jest.spyOn(console, 'error')

      expect(wrapper.exists()).toBeTruthy()
      expect(logSpy).not.toBeCalled()
      expect(warnSpy).not.toBeCalled()
      expect(errSpy).not.toBeCalled()
    })

    test('should render product data given a product', () => {
      createComponent({ product })

      const subheading = wrapper.find('.subheading').text()
      const heading = wrapper.find('.heading').text()
      const description = wrapper.find('.description').text()

      expect(subheading).toBe(product.categories[0].name)
      expect(heading).toBe(product.name)
      expect(description).toBe(product.description)
    })
  })
})
