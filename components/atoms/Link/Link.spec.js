import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Link from './Link.vue'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtLink: RouterLinkStub }
  wrapper = shallowMount(Link, { propsData, stubs })
}

describe('Link', () => {
  describe('initial state', () => {
    describe('given no target', () => {
      it('should render a NuxtLink component when it is a realtive href', () => {
        const propsData = { href: '/some/reltiv/path' }
        createComponent(propsData)

        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.exists()).toBeTruthy()
        expect(link.vm.to).toBe(propsData.href)
      })

      it('should render an anchor element when it is an absolute href', () => {
        const propsData = { href: 'http://www.example.de' }
        createComponent(propsData)

        const link = wrapper.find('a')
        expect(link.exists()).toBeTruthy()
        expect(link.attributes('href')).toBe(propsData.href)
        expect(link.attributes('target')).toBe('_self')
      })
    })

    describe('given no target _self', () => {
      it('should render a NuxtLink component when it is a realtive href', () => {
        const propsData = { target: '_self', href: '/some/reltiv/path' }
        createComponent(propsData)

        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.exists()).toBeTruthy()
        expect(link.vm.to).toBe(propsData.href)
      })

      it('should render an anchor element when it is an absolute href', () => {
        const propsData = { target: '_self', href: 'http://www.example.de' }
        createComponent(propsData)

        const link = wrapper.find('a')
        expect(link.exists()).toBeTruthy()
        expect(link.attributes('href')).toBe(propsData.href)
        expect(link.attributes('target')).toBe(propsData.target)
      })
    })

    describe('given no target _blank', () => {
      it('should render a anchor element component when it is a realtive href', () => {
        const propsData = { target: '_blank', href: '/some/reltiv/path' }
        createComponent(propsData)

        const link = wrapper.find('a')
        expect(link.exists()).toBeTruthy()
        expect(link.attributes('href')).toBe(propsData.href)
        expect(link.attributes('target')).toBe(propsData.target)
      })

      it('should render an anchor element when it is an absolute href', () => {
        const propsData = { target: '_blank', href: 'http://www.example.de' }
        createComponent(propsData)

        const link = wrapper.find('a')
        expect(link.exists()).toBeTruthy()
        expect(link.attributes('href')).toBe(propsData.href)
        expect(link.attributes('target')).toBe(propsData.target)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
