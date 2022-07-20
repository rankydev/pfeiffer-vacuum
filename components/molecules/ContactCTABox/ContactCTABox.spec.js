import ContactCTABox from './ContactCTABox'
import propsData from './ContactCTABox.stories.content'
import { shallowMount } from '@vue/test-utils'

const stubs = { NuxtDynamic: true }

describe('ContactCTABox', () => {
  describe('initial state', () => {
    test('should render given no props', () => {
      const wrapper = shallowMount(ContactCTABox, { stubs })

      expect(wrapper.find('.contact-cta-box__headline').text()).toBe('')
      expect(wrapper.find('.contact-cta-box__description').exists()).toBeFalsy()
      expect(wrapper.find('.contact-cta-box__button').exists()).toBeFalsy()
    })

    test('should render given propsData', () => {
      const wrapper = shallowMount(ContactCTABox, { stubs, propsData })

      const headline = wrapper.find('.contact-cta-box__headline')
      const description = wrapper.findAll('[name="Richtext"]')
      const button = wrapper.findAll('[name="Button"]')

      expect(headline.text()).toBe(propsData.headline)
      expect(description).toHaveLength(1)
      expect(button).toHaveLength(1)
    })
  })
})
