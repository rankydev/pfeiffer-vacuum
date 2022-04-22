import { createLocalVue, shallowMount } from '@vue/test-utils'
import Card from './Card'

let wrapper

function createComponent(propsData = {}) {
  const localVue = createLocalVue()
  const options = {
    localVue,
    propsData,
  }

  wrapper = shallowMount(Card, options)
}

describe('Card', () => {
  describe('initial state', () => {
    test('should render card when no entries are provided', () => {
      createComponent()

      const cardWrapper = wrapper.find('.card')

      expect(cardWrapper).toBeTruthy()
    })
  })
})
