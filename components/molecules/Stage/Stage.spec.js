import { createLocalVue, shallowMount } from '@vue/test-utils'
import Stage from './Stage'
import StageContent from '~/components/molecules/Stage/StageContent/StageContent'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('Stage', () => {
  describe('initial state', () => {
    it('should render all partials', () => {
      const wrapper = shallowMount(Stage, { localVue })

      const stageContent = wrapper.findComponent(StageContent)

      expect(stageContent.exists()).toBeTruthy()
    })
  })
})
