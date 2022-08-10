import { createLocalVue, shallowMount } from '@vue/test-utils'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Responsivemage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'
import ImageBanner from './ImageBanner.vue'
import {
  headline,
  subline,
  mediaImage,
  buttons,
  richtext,
} from './ImageBanner.stories.content.js'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(ImageBanner, options)
}

describe('ImageBanner', () => {
  describe('initial state', () => {
    it('should provide headline subline, icon and richtext to richtext component when these are provided', () => {
      const propsData = { headline, subline, richtext }
      createComponent(propsData)
      const domHeadline = wrapper.find('.image-banner__headline')
      const domSubline = wrapper.find('.image-banner__subline')
      const domRichtext = wrapper.findComponent(Richtext)

      expect(domHeadline.text()).toMatch(headline)
      expect(domSubline.text()).toMatch(subline)
      expect(domRichtext.vm.richtext).toMatch(richtext)
    })

    it('should add button to the button area when it is provided', () => {
      const propsData = { buttons }
      createComponent(propsData)

      const domButtons = wrapper.findAll('.image-banner__button')

      expect(domButtons.length).toBe(buttons.length)
      domButtons.wrappers.forEach((domButton, idx) => {
        expect(domButton.attributes('component')).toBe(buttons[idx].component)
      })
    })

    it('should add Image to the media area when it is provided', () => {
      const propsData = { richtext, image: mediaImage }
      createComponent(propsData)

      const domMedia = wrapper.find('.image-banner__media')

      expect(domMedia.html()).toContain(mediaImage[0].component)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
