import { createLocalVue, shallowMount } from '@vue/test-utils'
import generalTeaserCarouselContent from './variants/GeneralTeaserCarousel.stories.content'
import ContentCarousel from './ContentCarousel'

let wrapper

const NuxtDynamicStub = {
  template: '<div />',
}

function createComponent(propsData = {}) {
  const stubs = {
    Template: true,
    NuxtDynamic: NuxtDynamicStub,
  }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(ContentCarousel, options)
}

describe('ContentCarousel', () => {
  describe('initial state', () => {
    test('should render ContentCarousel when no entries are provided', () => {
      createComponent()

      const contentCarouselWrapper = wrapper.find('.content-carousel')

      expect(contentCarouselWrapper).toBeTruthy()
    })

    test('should render headline and interaction button given propsData', () => {
      createComponent(generalTeaserCarouselContent)

      const content = wrapper.find('.content-carousel__content')
      const contentHeadline = content.find('h2')
      const contentButton = content.find('[component="Button"]')

      expect(contentHeadline.text()).toEqual(
        generalTeaserCarouselContent.headline
      )
      expect(contentButton.attributes('label')).toEqual(
        generalTeaserCarouselContent.button[0].label
      )
    })

    test('should render no background given transparent prop', () => {
      createComponent({ transparent: true })

      expect(wrapper.find('.content-carousel--with-background')).toBeTruthy()
    })
  })
})
