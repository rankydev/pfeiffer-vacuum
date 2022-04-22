import { shallowMount, createLocalVue } from '@vue/test-utils'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import ImageWithSource from './ImageWithSource.vue'
import imageWithSourceEntries from './ImageWithSource.stories.content'

const defaultProps = () => JSON.parse(JSON.stringify(imageWithSourceEntries))

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

  wrapper = shallowMount(ImageWithSource, options)
}

describe('ImageWithSource', () => {
  describe('initial state', () => {
    test('should render ImageWithSource when no entries are provided', () => {
      createComponent()

      const ImageWithSourceWrapper = wrapper.find('.image-with-source')

      expect(ImageWithSourceWrapper.exists()).toBeTruthy()
    })

    test('should render description when it is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const activeElements = wrapper.findAll('.image-with-source__component')
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
    test('images aspect ratio should match selected format', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const imageElement = wrapper.findComponent(ResponsiveImage)
      expect(imageElement.vm).toEqual(propsData.image)
    })
  })

  // describe('during interaction', () => {})
})
