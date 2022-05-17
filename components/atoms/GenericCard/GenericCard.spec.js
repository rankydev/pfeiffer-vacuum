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

    it('should use the image size contain as default', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      const imageWrapper = wrapper.find('.pv-card__image')

      expect(imageWrapper.attributes('class')).toMatch(
        'pv-card__image--contain'
      )
    })

    it('should use the image size cover given cover', () => {
      const propsData = { ...defaultProps(), imageSize: 'cover' }
      createComponent(propsData)

      const imageWrapper = wrapper.find('.pv-card__image')

      expect(imageWrapper.attributes('class')).toMatch('pv-card__image--cover')
    })

    it('should render all content given slot content', () => {
      const tag = '<div class="test-tag" />'
      const image = '<div class="test-image" />'
      const subheading = '<div class="test-subheading" />'
      const heading = '<div class="test-heading" />'
      const tags = '<div class="test-tags" />'
      const description = '<div class="test-description" />'
      const slots = { tag, image, subheading, heading, tags, description }

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
