import { shallowMount } from '@vue/test-utils'
import PrivacyLink from './PrivacyLink.vue'

let wrapper

function createComponent(propsData = {}) {
  const options = {
    propsData,
    stubs: {
      PrivacyLink,
      ResponsiveImage: true,
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
  })
})
