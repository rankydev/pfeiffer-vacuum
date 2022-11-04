import { shallowMount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'
import {
  product,
  productWithVariants,
  productWithOrderNumber,
} from './ProductCard.stories.content.js'

const productDescription =
  'Compact yet powerful turbopump with a pumping speed of up to 685 l/s for N2, Ideal for analytical and industrial applications, For installation in any orientation, Comprehensive accessories extend the range of applications'

let wrapper

const GenericCard = {
  template: `<div>
  <div class="image"><slot name="image" /></div>
  <div class="subheading"><slot name="subheading" /></div>
  <div class="heading"><slot name="heading" /></div>
  <div class="description"><slot name="description" /></div>
  <div class="additionalInfo"><slot name="additionalInfo" /></div>
    </div>`,
}

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(() => ref({})),
    useContext: () => {
      return {
        app: {
          localePath: (value) => value,
        },
      }
    },
  }
})

function createComponent(propsData = {}) {
  const options = {
    propsData,
    stubs: {
      GenericCard,
      ResponsiveImage: true,
      Icon: true,
    },
    mocks: {
      $tc: (key, count) => `${key} ${count}`,
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
      const additionalInfo = wrapper.find('.additionalInfo').text()

      expect(subheading).toBe(product.categories[0].name)
      expect(heading).toBe(product.name)
      expect(description).toBe(productDescription)
      expect(additionalInfo).toBe('')
    })

    test('should render product data given a product with variants', () => {
      createComponent({ product: productWithVariants })

      const subheading = wrapper.find('.subheading').text()
      const heading = wrapper.find('.heading').text()
      const description = wrapper.find('.description').text()
      const additionalInfo = wrapper.find('.additionalInfo').text()

      expect(subheading).toBe(productWithVariants.categories[0].name)
      expect(heading).toBe(productWithVariants.name)
      expect(description).toBe(productDescription)
      expect(additionalInfo).toBe(
        `product.variantsAvailable ${productWithVariants.numberOfVariants}`
      )
    })

    test('should render product data given a product with order number', () => {
      createComponent({ product: productWithOrderNumber })

      const subheading = wrapper.find('.subheading').text()
      const heading = wrapper.find('.heading').text()
      const description = wrapper.find('.description').text()
      const additionalInfo = wrapper.find('.additionalInfo').text()

      expect(subheading).toBe(productWithOrderNumber.categories[0].name)
      expect(heading).toBe(productWithOrderNumber.name)
      expect(description).toBe(productDescription)
      expect(additionalInfo).toBe(productWithOrderNumber.orderNumber)
    })
  })
})
