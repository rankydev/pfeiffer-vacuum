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
    const aspectRatioArr = [
      ['1:1', 'image-with-source__1-1'],
      ['16:9', 'image-with-source__16-9'],
      ['2:3', 'image-with-source__2-3'],
      ['3:2', 'image-with-source__3-2'],
      ['3:1', 'image-with-source__3-1'],
    ]

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
    test.each(aspectRatioArr)(
      'images aspect-ratio-class should match selected aspect ratio',
      (input, output) => {
        const propsData = {
          ...defaultProps(),
          aspectRatio: input,
        }
        createComponent(propsData)

        const htmlImage = wrapper.find('.image-with-source__img')
        expect(htmlImage.attributes('class')).toMatch(output)
      }
    )
    test('if defaultSize is equal to smallest image size', () => {
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

    test('if imageSizes are correct', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const imageElement = wrapper.findComponent(ResponsiveImage)
      expect(imageElement.vm.sizes[0].width).toEqual(
        parseInt(tailwindconfig.theme.screens.md, 10) - 1
      )
    })

    test.each(testArr)('if imageSizes are correct', (input, output) => {
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
