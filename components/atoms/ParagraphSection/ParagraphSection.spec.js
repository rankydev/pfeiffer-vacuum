import { mount } from '@vue/test-utils'
import ParagraphSection from '~/components/atoms/ParagraphSection/ParagraphSection.vue'

describe('ParagraphSection', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ParagraphSection)
    expect(wrapper.vm).toBeTruthy()
  })
})
