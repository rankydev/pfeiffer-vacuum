import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'
import {
  imageSizes,
  href,
  subheading,
  heading,
  description,
  additionalInfo,
} from './ProductCard.stories.content'

const defaultProps = () => ({
  imageSizes,
  href,
  subheading,
  heading,
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
    ? shallowMount(ProductCard, options)
    : mount(ProductCard, options)
}

describe('ProductCard', () => {
  describe('initial state', () => {
    it('should render given the minimal setup', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      expect(wrapper.vm).toBeTruthy()
    })

    it('should have correct productID', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      console.log(propsData)

      // expect(wrapper.vm).toBeTruthy()
    })

    // it('should use the image size cover as default', () => {
    //   const propsData = { ...defaultProps() }
    //   createComponent(propsData)

    //   const imageWrapper = wrapper.find('.pv-card__image')

    //   expect(imageWrapper.attributes('class')).toMatch('pv-card__image--cover')
    // })

    // it('should use the image size contain given contain', () => {
    //   const propsData = { ...defaultProps(), imageSize: 'contain' }
    //   createComponent(propsData)

    //   const imageWrapper = wrapper.find('.pv-card__image')

    //   expect(imageWrapper.attributes('class')).toMatch(
    //     'pv-card__image--contain'
    //   )
    // })

    // it('should render all content given slot content', () => {
    //   const tag = '<div class="test-tag" />'
    //   const image = '<div class="test-image" />'
    //   const subheading = '<div class="test-subheading" />'
    //   const heading = '<div class="test-heading" />'
    //   const tags = '<div class="test-tags" />'
    //   const description = '<div class="test-description" />'
    //   const slots = { tag, image, subheading, heading, tags, description }

    //   const propsData = { ...defaultProps() }
    //   createComponent(propsData, { shallow: false, slots })

    //   const productCard = wrapper.findComponent(ProductCard)

    //   expect(productCard.find('.test-tag')).toBeTruthy()
    //   expect(productCard.find('.test-image')).toBeTruthy()
    //   expect(productCard.find('.test-subheading')).toBeTruthy()
    //   expect(productCard.find('.test-heading')).toBeTruthy()
    //   expect(productCard.find('.test-tags')).toBeTruthy()
    //   expect(productCard.find('.test-description')).toBeTruthy()
    // })
  })
})
