import { shallowMount, createLocalVue } from '@vue/test-utils'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import ImageWithSource from './ImageWithSource.vue'
import imageWithSourceEntries from './ImageWithSource.stories.content'
import tailwindconfig from '~/tailwind.config.js'

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
    const testArr = [
      [0, 'md'],
      [1, 'lg'],
      [2, 'xl'],
    ]

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

    test('should have an equal default size to smallest image size', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const imageElement = wrapper.findComponent(ResponsiveImage)
      expect(imageElement.vm.defaultSize.width).toEqual(
        imageElement.vm.sizes[0].width
      )
      expect(imageElement.vm.defaultSize.height).toEqual(
        imageElement.vm.sizes[0].height
      )
    })

    test.each(testArr)('should have correct image sizes', (input, output) => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const imageElement = wrapper.findComponent(ResponsiveImage)
      expect(imageElement.vm.sizes[input].width).toEqual(
        parseInt(tailwindconfig.theme.screens[output], 10) - 1
      )
    })
  })
})
