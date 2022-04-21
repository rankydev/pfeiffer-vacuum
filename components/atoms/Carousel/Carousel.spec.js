import { createLocalVue, shallowMount } from '@vue/test-utils'
import Carousel from './Carousel'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { Button: true, NuxtDynamic: true, Template: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(Carousel, options)
}

describe('Carousel', () => {
  describe('initial state', () => {
    test('should render carousel when no entries are provided', () => {
      createComponent()

      const carouselWrapper = wrapper.find('.carousel')

      expect(carouselWrapper).toBeTruthy()
    })
  })
})
