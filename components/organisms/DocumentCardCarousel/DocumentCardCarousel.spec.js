import { shallowMount } from '@vue/test-utils'
import DocumentCardCarousel from './DocumentCardCarousel'
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
import { headline, slides } from './DocumentCardCarousel.stories.content'
import { buttonOutlinedSecondary } from '~/components/atoms/Button/Button.stories.content'

const propsData = {
  headline,
  slides,
}

describe('DocumentCardCarousel', () => {
  describe('initial state', () => {
    test('should render given required props', () => {
      const propsData = {
        headline,
        slides,
      }
      const wrapper = shallowMount(DocumentCardCarousel, { propsData })
      const contentWrapperCarousel = wrapper.findComponent(ContentCarousel)

      expect(contentWrapperCarousel.vm.transparent).toBeTruthy()
      expect(contentWrapperCarousel.vm.slides).toBe(slides)
      expect(contentWrapperCarousel.vm.headline).toBe(headline)
    })

    test('should render given additional button', () => {
      const wrapper = shallowMount(DocumentCardCarousel, {
        propsData: {
          ...propsData,
          button: [buttonOutlinedSecondary],
        },
      })
      const contentWrapperCarousel = wrapper.findComponent(ContentCarousel)

      expect(contentWrapperCarousel.vm.button).toStrictEqual([
        buttonOutlinedSecondary,
      ])
    })
  })
})
