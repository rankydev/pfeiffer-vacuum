import { shallowMount } from '@vue/test-utils'
import ResponsiveImage from './ResponsiveImage.vue'
import responsiveImageEntries from './ResponsiveImage.stories.content'
import tailwindconfig from '~/tailwind.config.js'

// import Icon from '@/components/atoms/Icon/Icon'
// import { icon } from '~/components/atoms/Button/Button.stories.content'

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

    test.each(aspectRatioArr)(
      'should have matching aspect-ratio-classes based on selected aspect ratio',
      (input, output) => {
        const propsData = {
          ...defaultProps(),
          aspectRatio: input,
        }
        createComponent(propsData)

        const htmlImage = wrapper.find('.responsive-image')
        expect(htmlImage.attributes('class')).toMatch(output)
      }
    )

    test('should have matching provider', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)

      expect(ResponsiveImageWrapper.vm.provider).toEqual(propsData.provider)
    })

    test.only('should be rendered black and white, when props boolean is true', () => {
      const propsData = {
        ...defaultProps(),
        blackAndWhite: true,
      }
      createComponent(propsData)
      // const ResponsiveImageWrapper = wrapper.find('.responsive-image')
      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
      console.log(wrapper.vm.blackAndWhite)
      console.log(ResponsiveImageWrapper.vm.blackAndWhite)

      // expect(ResponsiveImageWrapper.vm.provider).toEqual(propsData.provider)
    })

    // test.each(testArr)('should have correct image sizes', (input, output) => {
    //   const propsData = {
    //     ...defaultProps(),
    //   }
    //   createComponent(propsData)
    //   // const imageElement = wrapper.findComponent(ResponsiveImage)
    //   const htmlImage = wrapper.find('.responsive-image')
    //   console.log(wrapper.vm.aspectRatio)
    //   // expect(htmlImage.vm.sizes[input].width).toEqual(
    //   //   parseInt(tailwindconfig.theme.screens[output], 10) - 1
    //   // )
    // })

    // test('should have an equal default size to smallest image size', () => {
    //   const propsData = {
    //     ...defaultProps(),
    //   }
    //   createComponent(propsData)

    //   // const imageElement = wrapper.findComponent(ResponsiveImage)
    //   const ResponsiveImageWrapper = wrapper.find('.responsive-image')
    //   // const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
    //   console.log(ResponsiveImageWrapper)
    //   console.log(propsData.image)
    //   // expect(ResponsiveImageWrapper.vm.src).toEqual(
    //   //   propsData.image.originalFilename
    //   // )
    //   // expect(imageElement.vm.defaultSize.width).toEqual(
    //   //   imageElement.vm.sizes[0].width
    //   // )
    //   // expect(imageElement.vm.defaultSize.height).toEqual(
    //   //   imageElement.vm.sizes[0].height
    //   // )
    // })

    // --> TESTS COPIED FROM IMAGEWITHSOURCE <--

    // test('should have an equal default size to smallest image size', () => {
    //   const propsData = {
    //     ...defaultProps(),
    //   }
    //   createComponent(propsData)

    //   const imageElement = wrapper.findComponent(ResponsiveImage)
    //   expect(imageElement.vm.defaultSize.width).toEqual(
    //     imageElement.vm.sizes[0].width
    //   )
    //   expect(imageElement.vm.defaultSize.height).toEqual(
    //     imageElement.vm.sizes[0].height
    //   )
    // })

    // test.each(testArr)('should have correct image sizes', (input, output) => {
    //   const propsData = {
    //     ...defaultProps(),
    //   }
    //   createComponent(propsData)
    //   const imageElement = wrapper.findComponent(ResponsiveImage)
    //   expect(imageElement.vm.sizes[input].width).toEqual(
    //     parseInt(tailwindconfig.theme.screens[output], 10) - 1
    //   )
    // })
  })
})
