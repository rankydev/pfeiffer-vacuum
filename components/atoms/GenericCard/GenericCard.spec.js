import { shallowMount, createLocalVue } from '@vue/test-utils'
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

function createComponent(propsData = {}) {
  const stubs = {}
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(GenericCard, options)
}

describe('GenericCard', () => {
  describe('initial state', () => {
    it('should render given the minimal setup', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      expect(wrapper.vm).toBeTruthy()
    })

    it('should render all content given slot content', () => {
      const tag = '<tag />'
      const image = '<image />'
      const subheading = '<subheading />'
      const heading = '<heading />'
      const tags = '<tags />'
      const description = '<description />'
      const scopedSlots = { tag, image, subheading, heading, tags, description }

      const propsData = { ...defaultProps() }
      createComponent(propsData)

      const genericCard = wrapper.findComponent(GenericCard)
      const imageComponent = wrapper.find('image')
      console.log(genericCard.html(), scopedSlots)

      /*
      expect(genericCard.vm.find('tag')).toBeTruthy()
      expect(genericCard.vm.find('image')).toBeTruthy()
      expect(genericCard.vm.find('subheading')).toBeTruthy()
      expect(genericCard.vm.find('heading')).toBeTruthy()
      expect(genericCard.vm.find('tags')).toBeTruthy()
      expect(genericCard.vm.find('description')).toBeTruthy()
       */
    })
  })

  // describe('business requirements', () => {})
})
