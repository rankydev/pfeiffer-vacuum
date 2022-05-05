import { createLocalVue, shallowMount } from '@vue/test-utils'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import ContentMediaBlock from './ContentMediaBlock.vue'
import {
  headline,
  subline,
  media,
  buttons,
  richtext,
} from './ContentMediaBlock.stories.content.js'

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

  wrapper = shallowMount(ContentMediaBlock, options)
}

describe('ConentMediaBlock', () => {
  describe('initial state', () => {
    it('should provide headline subline and richtext to richtext component when these are provided', () => {
      const propsData = { headline, subline, richtext }
      createComponent(propsData)

      const domRichtext = wrapper.findComponent(Richtext)

      expect(domRichtext.vm.richtext).toMatch(headline)
      expect(domRichtext.vm.richtext).toMatch(subline)
      expect(domRichtext.vm.richtext).toMatch(richtext)
    })

    it('should add buttons to the button area when they are provided', () => {
      const propsData = { buttons }
      createComponent(propsData)

      const domButtons = wrapper.findAll('.content-media-block__button')

      expect(domButtons.length).toBe(buttons.length)
      domButtons.wrappers.forEach((domButton, idx) => {
        expect(domButton.attributes('component')).toBe(buttons[idx].component)
      })
    })

    it('should add media to the media area when it is provided', () => {
      const propsData = { richtext, media }
      createComponent(propsData)

      const domMedia = wrapper.find('.content-media-block__media')

      expect(domMedia.attributes('component')).toBe(media[0].component)
    })

    it('should apply correct classes given a half/half ratio', () => {
      const propsData = { richtext, media, ratio: 'half/half' }
      createComponent(propsData)

      const domContent = wrapper.find('.content-media-block__content')
      const domMedia = wrapper.find('.content-media-block__media')

      expect(domContent.attributes('class')).toMatch(
        'content-media-block__content--half'
      )
      expect(domMedia.attributes('class')).toMatch(
        'content-media-block__media--half'
      )
    })

    it('should apply correct classes given a one/three ratio', () => {
      const propsData = { richtext, media, ratio: 'one/three' }
      createComponent(propsData)

      const domContent = wrapper.find('.content-media-block__content')
      const domMedia = wrapper.find('.content-media-block__media')

      expect(domContent.attributes('class')).toMatch(
        'content-media-block__content--one'
      )
      expect(domMedia.attributes('class')).toMatch(
        'content-media-block__media--three'
      )
    })

    it('should apply correct classes given a three/one ratio', () => {
      const propsData = { richtext, media, ratio: 'three/one' }
      createComponent(propsData)

      const domContent = wrapper.find('.content-media-block__content')
      const domMedia = wrapper.find('.content-media-block__media')

      expect(domContent.attributes('class')).toMatch(
        'content-media-block__content--three'
      )
      expect(domMedia.attributes('class')).toMatch(
        'content-media-block__media--one'
      )
    })

    it('should apply correct classes given a content/media order', () => {
      const propsData = { richtext, media, order: 'content/media' }
      createComponent(propsData)

      const domContent = wrapper.find('.content-media-block__content')
      const domMedia = wrapper.find('.content-media-block__media')

      expect(domContent.attributes('class')).toMatch(
        'content-media-block__content--first'
      )
      expect(domMedia.attributes('class')).toMatch(
        'content-media-block__media--last'
      )
    })

    it('should apply correct classes given a media/content order', () => {
      const propsData = { richtext, media, order: 'media/content' }
      createComponent(propsData)

      const domContent = wrapper.find('.content-media-block__content')
      const domMedia = wrapper.find('.content-media-block__media')

      expect(domContent.attributes('class')).toMatch(
        'content-media-block__content--last'
      )
      expect(domMedia.attributes('class')).toMatch(
        'content-media-block__media--first'
      )
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
