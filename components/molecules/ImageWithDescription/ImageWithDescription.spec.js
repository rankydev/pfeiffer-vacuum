import { shallowMount, createLocalVue } from '@vue/test-utils'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import ImageWithDescription from './ImageWithDescription.vue'
import { imageWithDescriptionContent } from './ImageWithDescription.stories.content'

const defaultProps = () =>
  JSON.parse(JSON.stringify(imageWithDescriptionContent))

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

  wrapper = shallowMount(ImageWithDescription, options)
}

describe('ImageWithDescription', () => {
  describe('initial state', () => {
    test('should render ImageWithDescription when no entries are provided', () => {
      createComponent()
      const ImageWithDescriptionWrapper = wrapper.find(
        '.image-with-description'
      )
      expect(ImageWithDescriptionWrapper.exists()).toBeTruthy()
    })

    test('should render description when it is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const activeElements = wrapper.findAll(
        '.image-with-description__component'
      )
      expect(activeElements.length).toBe(1)
      expect(activeElements.at(0).attributes('richtext')).toBe(
        propsData.description[0].richtext
      )
      expect(activeElements.at(0).attributes('component')).toBe('Richtext')
    })
    test('should render image', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const imageElement = wrapper.findComponent(ResponsiveImage)
      expect(imageElement.vm.image).toEqual(propsData.image)
    })
  })
})
