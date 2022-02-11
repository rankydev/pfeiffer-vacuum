import { mount } from '@vue/test-utils'
import Grid from '~/components/molecules/Grid/Grid.vue'

describe('Grid', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Grid)
    expect(wrapper.vm).toBeTruthy()
  })
})
