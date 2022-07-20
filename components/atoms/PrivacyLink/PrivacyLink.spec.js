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
      createComponent()

      console.log('###', wrapper.html())
    })
  })
})
