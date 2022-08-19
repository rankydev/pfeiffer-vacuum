import { shallowMount } from '@vue/test-utils'
import GlobalMessage from './GlobalMessage'
import Button from '~/components/atoms/Button/Button'
import content, { messageVariants } from './GlobalMessage.stories.content'

describe('GlobalMessage', () => {
  describe('initial state', () => {
    test('should render given only description', () => {
      const wrapper = shallowMount(GlobalMessage, {
        propsData: {
          description: content.description,
        },
      })

      expect(wrapper.find('.global-message--slim').exists()).toBeTruthy()
      expect(wrapper.find('.global-message__description').text()).toBe(
        content.description
      )
    })
    test('should render given all props', () => {
      const wrapper = shallowMount(GlobalMessage, {
        propsData: content,
      })

      const headline = wrapper.find('.global-message__headline').text()
      const description = wrapper.find('.global-message__description').text()
      const button = wrapper.findComponent(Button)

      expect(wrapper.find('.global-message--slim').exists()).toBeFalsy()
      expect(headline).toBe(content.headline)
      expect(description).toBe(content.description)
      expect(button.attributes('label')).toBe(content.button.label)
      expect(button.attributes('href')).toBe(content.button.href)
    })
    test.each(messageVariants)('should set variant class %s', (variant) => {
      const wrapper = shallowMount(GlobalMessage, {
        propsData: {
          variant,
          ...content,
        },
      })

      expect(wrapper.find(`.global-message--${variant}`).exists()).toBeTruthy()
    })
  })
})
