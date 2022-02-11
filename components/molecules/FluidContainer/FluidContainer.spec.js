import { mount } from '@vue/test-utils'
import FluidContainer from '~/components/molecules/FluidContainer/FluidContainer'

describe('FluidContainer', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(FluidContainer)
    expect(wrapper.vm).toBeTruthy()
  })
})
