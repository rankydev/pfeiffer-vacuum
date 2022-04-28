import { shallowMount } from '@vue/test-utils'
import ResponsiveImage from './ResponsiveImage.vue'
import responsiveImageEntries from './ResponsiveImage.stories.content'

const defaultProps = () => JSON.parse(JSON.stringify(responsiveImageEntries))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: true }

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
      ['1:1', 'image-with-source__1-1'],
      ['16:9', 'image-with-source__16-9'],
      ['2:3', 'image-with-source__2-3'],
      ['3:2', 'image-with-source__3-2'],
      ['3:1', 'image-with-source__3-1'],
    ]

    test('should render responsive image when no data is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.find('.responsive-image')
      console.log(ResponsiveImageWrapper)
      // expect(ResponsiveImageWrapper.exists()).toBeTruthy()

      // const responsiveImageWrapper = wrapper.find('.responsive-image')
      // console.log(responsiveImageWrapper)
      // expect(responsiveImageWrapper).toBeTruthy()
    })

    test('should render a responsive image ', () => {})

    // test.each(aspectRatioArr)(
    //   'should have matching aspect-ratio-classes based on selected aspect ratio',
    //   (input, output) => {
    //     const propsData = {
    //       ...defaultProps(),
    //       aspectRatio: input,
    //     }
    //     createComponent(propsData)
    // Anpassung für ResponsiveImage vornehmen
    //     const htmlImage = wrapper.find('.image-with-source__img')
    //     expect(htmlImage.attributes('class')).toMatch(output)
    //   }
    // )
  })
})
