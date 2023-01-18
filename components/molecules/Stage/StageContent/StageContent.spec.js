import { createLocalVue, shallowMount } from '@vue/test-utils'
import contentOfStageContent from '~/components/molecules/Stage/StageContent/StageContent.stories.content.js'
import StageContent from '~/components/molecules/Stage/StageContent/StageContent'
import Button from '~/components/atoms/Button/Button'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('StageContent', () => {
  describe('initial state', () => {
    describe('given an array', () => {
      it('should render without buttons', () => {
        const { headline, subline, teaserText } = contentOfStageContent[0]
        const propsData = { headline, subline, teaserText }
        const wrapper = shallowMount(StageContent, { propsData, localVue })

        const domHeadline = wrapper.find('.stage-content__headline')
        const domSubline = wrapper.find('.stage-content__subline')
        const domDescription = wrapper.find('.stage-content__description')
        const domButtonWrapper = wrapper.find('.stage-content__buttons')
        const domButtons = wrapper.findAllComponents(Button)

        expect(domHeadline.text()).toBe(headline)
        expect(domSubline.text()).toBe(subline)
        expect(domDescription.attributes('richtext')).toBe(teaserText)
        expect(domButtonWrapper.exists()).toBeFalsy()
        expect(domButtons.length).toBe(0)
      })

      it('should render with buttons', () => {
        const { headline, subline, teaserText, buttons } =
          contentOfStageContent[0]
        const propsData = { headline, subline, teaserText, buttons }
        const wrapper = shallowMount(StageContent, { propsData, localVue })

        const domButtonWrapper = wrapper.find('.stage-content__buttons')
        const ctas = wrapper.findAllComponents(Button)

        expect(domButtonWrapper.exists()).toBeTruthy()
        expect(ctas.length).toBe(buttons.length)
      })
    })
  })
})
