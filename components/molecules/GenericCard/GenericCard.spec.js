import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import GenericCard from './GenericCard.vue'
import {
  imageSizes,
  href,
  subheading,
  heading,
  tag,
  description,
  additionalInfo,
} from './GenericCard.stories.content'

const defaultProps = () => ({
  imageSizes,
  href,
  subheading,
  heading,
  tag,
  description,
  additionalInfo,
})

let wrapper

function createComponent(propsData = {}, { shallow = true, slots = {} } = {}) {
  const stubs = {}
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
    slots,
  }

  wrapper = shallow
    ? shallowMount(GenericCard, options)
    : mount(GenericCard, options)
}

describe('GenericCard', () => {
  describe('initial state', () => {
    it('should render given the minimal setup', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      expect(wrapper.vm).toBeTruthy()
    })

    it('should use the image size cover as default', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      const imageWrapper = wrapper.find('.pv-card__image')

      expect(imageWrapper.attributes('class')).toMatch('pv-card__image--cover')
    })

    it('should use the image size contain given contain', () => {
      const propsData = { ...defaultProps(), imageSize: 'contain' }
      createComponent(propsData)

      const imageWrapper = wrapper.find('.pv-card__image')

      expect(imageWrapper.attributes('class')).toMatch(
        'pv-card__image--contain'
      )
    })

    it('should render all content given slot content', () => {
      const tagHtml = '<div class="test-tag" />'
      const image = '<div class="test-image" />'
      const subheadingHtml = '<div class="test-subheading" />'
      const headingHtml = '<div class="test-heading" />'
      const tags = '<div class="test-tags" />'
      const descriptionHtml = '<div class="test-description" />'
      const slots = {
        tagHtml,
        image,
        subheadingHtml,
        headingHtml,
        tags,
        descriptionHtml,
      }

      const propsData = { ...defaultProps() }
      createComponent(propsData, { shallow: false, slots })

      const genericCard = wrapper.findComponent(GenericCard)

      expect(genericCard.find('.test-tag')).toBeTruthy()
      expect(genericCard.find('.test-image')).toBeTruthy()
      expect(genericCard.find('.test-subheading')).toBeTruthy()
      expect(genericCard.find('.test-heading')).toBeTruthy()
      expect(genericCard.find('.test-tags')).toBeTruthy()
      expect(genericCard.find('.test-description')).toBeTruthy()
    })
  })

  // describe('business requirements', () => {})
})
