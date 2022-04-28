import { shallowMount } from '@vue/test-utils'
import ResponsiveImage from './ResponsiveImage.vue'
import responsiveImageEntries from './ResponsiveImage.stories.content'

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
    // test.only('should render a responsive image ', () => {
    //   const propsData = {
    //     ...defaultProps(),
    //     image: undefined,
    //   }
    //   createComponent(propsData)

    //   const Placeholder = wrapper.find('.responsive-image__placeholder')
    //   console.log(Placeholder)
    // })

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
  })
})
