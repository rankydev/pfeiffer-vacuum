import { shallowMount } from '@vue/test-utils'
import content from './ContactRequestSubject.stories.content'
import ContactRequestSubject from './ContactRequestSubject.vue'

describe('ContactRequestSubject', () => {
  describe('initial state', () => {
    test('should render given only required prop type', () => {
      const propsData = { type: content.type }
      const wrapper = shallowMount(ContactRequestSubject, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })

    test('should render correct content given all props', () => {
      const propsData = content
      const wrapper = shallowMount(ContactRequestSubject, {
        stubs: { NuxtDynamic: true },
        propsData,
      })

      const headline = wrapper.find('.contact-request-subject__title')
      const description = wrapper.findComponent(
        '.contact-request-subject__description'
      )

      expect(headline.text()).toBe(content.title)
      expect(description.exists()).toBeTruthy()
    })
  })

  describe('during interaction', () => {
    test('should emit type when clicking the subject', async () => {
      const propsData = content
      const wrapper = shallowMount(ContactRequestSubject, {
        stubs: { NuxtDynamic: true },
        propsData,
      })

      const emitMock = jest.fn()
      const subject = wrapper.find('.contact-request-subject')
      wrapper.vm.$emit = emitMock

      await subject.trigger('click')

      expect(emitMock).toBeCalledTimes(1)
      expect(emitMock).toBeCalledWith('selected', content.type)
    })
  })
})
