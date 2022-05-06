import { shallowMount } from '@vue/test-utils'
import CTABox from '~/components/molecules/CTABox/CTABox.vue'
import { description, button } from './CTABox.stories.content.js'

const propsData = { description, button }
const stubs = { NuxtDynamic: true }

describe('CTABox', () => {
  describe('initial state', () => {
    it('should render given no propsData', () => {
      const wrapper = shallowMount(CTABox)

      expect(wrapper.exists()).toBeTruthy()
    })

    it('should render given propsData', () => {
      const wrapper = shallowMount(CTABox, { propsData, stubs })
      const descriptionWrapper = wrapper.findAll('.cta__description')
      description.forEach((item, index) => {
        expect(
          descriptionWrapper
            .at(index)
            .attributes(item.uiComponent ? 'uicomponent' : 'component')
        ).toBe(item.uiComponent ? item.uiComponent : item.component)
        expect(descriptionWrapper.at(index).attributes('_uid')).toBe(item._uid)
        expect(descriptionWrapper.at(index).attributes('richtext')).toBe(
          item.richtext
        )
      })

      const buttonWrapper = wrapper.findAll('.cta__button')
      button.forEach((item, index) => {
        expect(
          buttonWrapper
            .at(index)
            .attributes(item.uiComponent ? 'uicomponent' : 'component')
        ).toBe(item.uiComponent ? item.uiComponent : item.component)
        expect(buttonWrapper.at(index).attributes('_uid')).toBe(item._uid)
      })
    })
  })
})
