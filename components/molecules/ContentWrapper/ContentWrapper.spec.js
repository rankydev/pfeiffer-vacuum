import { mount } from '@vue/test-utils'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper.vue'

describe('ContentWrapper', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ContentWrapper)
    expect(wrapper.vm).toBeTruthy()
  })
})
