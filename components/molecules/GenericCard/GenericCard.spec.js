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
      const imageHtml = '<div class="test-image" />'
      const subheadingHtml = '<div class="test-subheading" />'
      const headingHtml = '<div class="test-heading" />'
      const tagsHtml = '<div class="test-tags" />'
      const descriptionHtml = '<div class="test-description" />'
      const slots = {
        tag: tagHtml,
        image: imageHtml,
        subheading: subheadingHtml,
        heading: headingHtml,
        tags: tagsHtml,
        description: descriptionHtml,
      }

      const propsData = { ...defaultProps() }
      createComponent(propsData, { shallow: false, slots })

      const genericCard = wrapper.findComponent(GenericCard)
      expect(genericCard.find('.test-tag').exists()).toBeTruthy()
      expect(genericCard.find('.test-image').exists()).toBeTruthy()
      expect(genericCard.find('.test-subheading').exists()).toBeTruthy()
      expect(genericCard.find('.test-heading').exists()).toBeTruthy()
      expect(genericCard.find('.test-tags').exists()).toBeTruthy()
      expect(genericCard.find('.test-description').exists()).toBeTruthy()
    })
  })

  // describe('business requirements', () => {})
})
