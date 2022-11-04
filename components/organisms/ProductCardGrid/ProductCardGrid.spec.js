import ProductCardGrid from './ProductCardGrid.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'

let wrapper
function createComponent(propsData) {
  const localVue = createLocalVue()

  const stubs = {
    ProductCard: {
      template: '<div class="stubbed-product">{{product.name}}</div>',
      props: {
        product: {
          type: Object,
          required: true,
        },
      },
    },
  }

  wrapper = shallowMount(ProductCardGrid, {
    localVue,
    stubs,
    propsData,
  })
}

describe('ProductCardGrid', () => {
  describe('initial state', () => {
    test('should render component', () => {
      createComponent({
        products: [
          { name: 'Master Product' },
          { name: 'Some HiPace' },
          { name: 'Another Product' },
        ],
      })

      const stubs = wrapper.findAll('.stubbed-product')

      expect(stubs).toHaveLength(3)
      expect(stubs.at(0).text()).toBe('Master Product')
      expect(stubs.at(1).text()).toBe('Some HiPace')
      expect(stubs.at(2).text()).toBe('Another Product')
    })
  })
})
