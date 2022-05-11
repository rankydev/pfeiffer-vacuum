import { shallowMount } from '@vue/test-utils'
import CTABox from '~/components/molecules/CTABox/CTABox.vue'
import { description, button, image } from './CTABox.stories.content.js'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  const options = {
    stubs,
    propsData,
  }

  wrapper = shallowMount(CTABox, options)
}

describe('CTABox', () => {
  describe('initial state', () => {
    it('should render given no propsData', () => {
      const propsData = {
        image: JSON.parse(JSON.stringify(image)),
      }
      createComponent(propsData)
      expect(wrapper.exists()).toBeTruthy()
    })

    it('should render given propsData', () => {
      const propsData = {
        description,
        button,
        image: JSON.parse(JSON.stringify(image)),
      }
      createComponent(propsData)
      const descriptionWrapper = wrapper.findAll('.cta-box__description')
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

      const buttonWrapper = wrapper.findAll('.cta-box__button')
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
