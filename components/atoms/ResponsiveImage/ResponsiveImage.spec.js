import { createLocalVue, shallowMount } from '@vue/test-utils'
import ResponsiveImage from './ResponsiveImage'
import responsiveImageMock from './ResponsiveImage.stories.content'

let wrapper

function createComponent(propsData = {}) {
  const stubs = {}
  const localVue = createLocalVue()

  const options = {
    localVue,
    stubs,
  }

  wrapper = shallowMount(ResponsiveImage, options)
}

describe('ResponsiveImage', () => {
  describe('initial state', () => {
    test('should render responsive image when no data is provided', () => {
      createComponent()

      const responsiveImageWrapper = wrapper.find('.responsive-image')
      expect(responsiveImageWrapper).toBeTruthy()
    })

    test('should render a responsive image ', () => {
      // const propsData = { ...defaultProps() }
    })
  })
})
