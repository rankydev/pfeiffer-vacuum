import { shallowMount } from '@vue/test-utils'
import DefaultLayout from './default.vue'

describe('DefaultLayout', () => {
  // describe('initial state', () => {})

  // describe('during interaction', () => {})

  // TODO: Add pinia test fix
  xdescribe('business requirements', () => {
    it('should have a skip navigation link', () => {
      const wrapper = shallowMount(DefaultLayout, { stubs: { Nuxt: true } })

      const link = wrapper.find('a')
      const content = wrapper.find('#main-content')

      expect(link.text()).toBe('skip navigation')
      expect(link.attributes('href')).toBe('#main-content')
      expect(content.exists()).toBeTruthy()
    })
  })
})
