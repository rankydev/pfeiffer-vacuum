import { shallowMount } from '@vue/test-utils'
import ResponsiveImage from './ResponsiveImage.vue'
import responsiveImageEntries from './ResponsiveImage.stories.content'

const nuxtImg = {
  template: '<div>some image</div>',
  props: ['src', 'modifiers', 'title', 'alt', 'provider'],
}

const defaultProps = () => JSON.parse(JSON.stringify(responsiveImageEntries))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: nuxtImg }

  const $img = () => ''
  const mocks = { $nuxt: { context: { $img } } }

  const options = {
    mocks,
    stubs,
    propsData,
  }

  wrapper = shallowMount(ResponsiveImage, options)
}

describe('ResponsiveImage', () => {
  describe('initial state', () => {
    const aspectRatioArr = [
      ['1:1', 'responsive-image__1-1'],
      ['16:9', 'responsive-image__16-9'],
      ['2:3', 'responsive-image__2-3'],
      ['3:2', 'responsive-image__3-2'],
      ['3:1', 'responsive-image__3-1'],
    ]

    test('should render responsive image when no data is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.find('.responsive-image')
      expect(ResponsiveImageWrapper.exists()).toBeTruthy()
    })

    test('should render a responsive image ', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)

      expect(ResponsiveImageWrapper.vm.src).toEqual(
        propsData.image.originalFilename
      )
    })

    test('should have matching provider', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
      expect(ResponsiveImageWrapper.vm.provider).toEqual(propsData.provider)
    })

    test('should have greyscale', () => {
      const propsData = {
        ...defaultProps(),
        blackAndWhite: true,
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
      expect(ResponsiveImageWrapper.vm.modifiers.filters).toEqual({
        focal: null,
        grayscale: '',
      })
    })

    test('should have no greyscale', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
      expect(ResponsiveImageWrapper.vm.modifiers.filters).toEqual({
        focal: null,
        grayscale: false,
      })
    })

    test('should have gradient', () => {
      const propsData = {
        ...defaultProps(),
        withGradient: true,
      }
      createComponent(propsData)

      expect(
        wrapper.find('.responsive-image__gradient-overlay').exists()
      ).toBeTruthy()
    })

    test.each(aspectRatioArr)(
      'should render placeholder with matching aspect-ratio-classes based on selected aspect ratio, when no image is provided',
      (input, output) => {
        const propsData = {
          ...defaultProps(),
          image: undefined,
          aspectRatio: input,
        }
        createComponent(propsData)

        const placeholderWrapper = wrapper.find(
          '.responsive-image__placeholder'
        )
        expect(placeholderWrapper.exists()).toBeTruthy()
        expect(placeholderWrapper.attributes('class')).toMatch(output)
      }
    )

    test('should add rounded class given rounded=true', () => {
      const propsData = {
        ...defaultProps(),
        rounded: true,
      }
      createComponent(propsData)

      const picture = wrapper.find('.responsive-image')

      expect(picture.attributes('class')).toMatch(
        'responsive-image--corners-rounded'
      )
    })

    test('should not add rounded class given rounded=false', () => {
      const propsData = {
        ...defaultProps(),
        rounded: false,
      }
      createComponent(propsData)

      const picture = wrapper.find('.responsive-image')

      expect(picture.attributes('class')).not.toMatch(
        'responsive-image--corners-rounded'
      )
    })
  })
})
