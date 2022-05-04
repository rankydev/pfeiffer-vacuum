import { shallowMount } from '@vue/test-utils'
import CTABox from '~/components/molecules/CTABox/CTABox.vue'
import { description } from './CTABox.stories.content.js'

const propsData = { description }
const stubs = { NuxtDynamic: true }

describe('CTABox', () => {
  describe('initial state', () => {
    it('should render given no propsData', () => {
      const wrapper = shallowMount(CTABox)

      expect(wrapper.exists()).toBeTruthy()
    })

    it('should render given propsData', () => {
      const wrapper = shallowMount(CTABox, { propsData, stubs })
      const descWrapper = wrapper.findAll('.cta__description')

      description.forEach((item, index) => {
        expect(
          descWrapper
            .at(index)
            .attributes(item.uiComponent ? 'uicomponent' : 'component')
        ).toBe(item.uiComponent ? item.uiComponent : item.component)
        expect(descWrapper.at(index).attributes('_uid')).toBe(item._uid)
        expect(descWrapper.at(index).attributes('richtext')).toBe(item.richtext)
      })
    })
  })
})
