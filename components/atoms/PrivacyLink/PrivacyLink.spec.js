import { shallowMount } from '@vue/test-utils'
import PrivacyLink from './PrivacyLink.vue'

let wrapper

const NuxtDynamicStub = {
  template: '<div />',
}

function createComponent(propsData = {}) {
  const options = {
    propsData,
    stubs: {
      PrivacyLink,
      NuxtDynamic: NuxtDynamicStub,
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

    test('should call open layer function on click', () => {
      const propsData = { label: 'label' }
      createComponent(propsData)
      const link = wrapper.find('.privacy-link')

      const spy = (wrapper.vm.openConsentLayer = jest.fn())
      link.trigger('click')
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
