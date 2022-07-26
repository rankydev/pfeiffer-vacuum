import { shallowMount } from '@vue/test-utils'
import PrivacyLink from './PrivacyLink.vue'

let wrapper

const nuxtDynamicStub = {
  template: '<div />',
}

function createComponent(propsData = {}) {
  const options = {
    propsData,
    stubs: {
      PrivacyLink,
      NuxtDynamic: nuxtDynamicStub,
    },
  }

  wrapper = shallowMount(PrivacyLink, options)
}

describe('PrivacyLink', () => {
  describe('initial state', () => {
    test('should render empty component without warnings given no product', () => {
      const propsData = { label: 'label' }
      createComponent(propsData)
      const link = wrapper.find('.privacy-link')

      expect(link.exists()).toBeTruthy()
      expect(link.vm.label).toBe(propsData.label)
    })

    test('should set the correct locale to the consent banner', () => {
      // @todo test client locale
    })

    test('', () => {
      const propsData = { label: 'label' }
      createComponent(propsData)
      const link = wrapper.find('.privacy-link')

      link.trigger('click')

      // @todo check for consent banner is visible
    })
  })
})
