import { createLocalVue, shallowMount } from '@vue/test-utils'
import contentOfStageContent from '~/components/molecules/Stage/StageContent/StageContent.content.js'
import StageContent from '~/components/molecules/Stage/StageContent/StageContent'
import Button from '~/components/atoms/Button/Button'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('StageContent', () => {
  describe('initial state', () => {
    describe('given an array', () => {
      it('should render', () => {
        const { headline, subline, teaserText, buttons } =
          contentOfStageContent[0]
        const propsData = { headline, subline, teaserText, buttons }
        const wrapper = shallowMount(StageContent, { propsData })

        const ctas = wrapper.findAllComponents(Button)

        buttons.forEach((item, index) => {
          expect(ctas.length).toBe(buttons.length)
          expect(ctas.at(index).attributes('href')).toBe(item.href)
          expect(ctas.at(index).attributes('target')).toBe(item.target)
        })
      })
    })
  })
})
