import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Link from './Link.vue'
import { useRoute, ref } from '@nuxtjs/composition-api'

let wrapper

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return { __esModule: true, ...originalModule, useRoute: jest.fn() }
})

const path = '/germany/en/test/de-test'
useRoute.mockImplementation(() => ref({ path }))

function createComponent(propsData = {}, { CustomStub } = {}) {
  const stubs = { NuxtLink: CustomStub || RouterLinkStub }
  wrapper = shallowMount(Link, { propsData, stubs })
}

describe('Link', () => {
  describe('initial state', () => {
    describe('given no target', () => {
      it('should render a NuxtLink component when it is a relative href', () => {
        const propsData = { href: '/some/relative/path' }
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

    describe('given target _self', () => {
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

    describe('given target _blank', () => {
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

    describe('given label', () => {
      it('should render the label text', () => {
        const propsData = {
          target: '_blank',
          href: 'https://www.example.com',
          label: 'Example.com',
        }
        createComponent(propsData)

        expect(wrapper.text()).toBe(propsData.label)
      })
    })

    describe('given anchor', () => {
      it('should render the current path with the anchor', () => {
        const propsData = {
          anchor: '2',
          label: 'Example.com',
        }
        createComponent(propsData)

        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.exists()).toBeTruthy()
        expect(link.vm.to).toBe(`${path}#2`)
      })
      it('should not add # if it is already in the anchor', () => {
        const propsData = {
          anchor: '#2',
          label: 'Example.com',
        }
        createComponent(propsData)

        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.exists()).toBeTruthy()
        expect(link.vm.to).toBe(`${path}#2`)
      })
    })

    describe.each([
      ['none'],
      ['inline'],
      ['breadcrumb'],
      ['quicklink'],
      ['textlink'],
    ])('given the variant %s', (variant) => {
      it('should render the variant when Link is a NuxtLink', () => {
        const propsData = {
          target: '_blank',
          href: 'http://www.example.de',
          variant,
        }
        createComponent(propsData)

        const link = wrapper.find('a')
        expect(link.attributes('class')).toBe(`link--${variant}`)
      })

      it('should render the variant when link is an anchor link', () => {
        const propsData = { href: '/some/reltiv/path', variant }
        createComponent(propsData)

        const link = wrapper.findComponent(RouterLinkStub)
        expect(link.attributes('class')).toBe(`link--${variant}`)
      })
    })
  })

  describe('during interaction', () => {
    describe('given beforeNavigation function', () => {
      it('should call beforeNavigation before executing navigation when link is external', () => {
        const propsData = {
          target: '_blank',
          href: 'https://google.de',
          beforeNavigation: jest.fn(() => true),
        }
        createComponent(propsData)

        const link = wrapper.find('a')
        const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
        link.trigger('click', event)

        expect(propsData.beforeNavigation).toBeCalledTimes(1)
      })

      it('should prevent navigation when beforeNavigation returns false', () => {
        const propsData = {
          target: '_blank',
          href: 'https://google.de',
          beforeNavigation: jest.fn(() => false),
        }
        createComponent(propsData)

        const link = wrapper.find('a')
        const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
        link.trigger('click', event)

        expect(event.preventDefault).toBeCalledTimes(1)
        expect(event.stopPropagation).toBeCalledTimes(1)
      })

      it('should not prevent navigation when beforeNavigation returns true', () => {
        const propsData = {
          target: '_blank',
          href: 'https://google.de',
          beforeNavigation: jest.fn(() => true),
        }
        createComponent(propsData)

        const link = wrapper.find('a')
        const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
        link.trigger('click', event)

        expect(event.preventDefault).toBeCalledTimes(0)
        expect(event.stopPropagation).toBeCalledTimes(0)
      })

      let navigateSpy = null
      const customRouterStub = () => {
        navigateSpy = jest.fn()
        return {
          data() {
            return { navigateSpy }
          },
          template: `<div>
            <slot
              href="/"
              :navigate="navigateSpy"
              :isActive="false"
              :isExactActive="false"
            />
          </div>`,
        }
      }

      it('should cancel a Nuxt Link navigate action when returning false', () => {
        const propsData = {
          target: '_self',
          href: '/',
          beforeNavigation: jest.fn(() => false),
        }
        createComponent(propsData, { CustomStub: customRouterStub() })

        const link = wrapper.find('a')
        const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
        link.trigger('click', event)

        expect(propsData.beforeNavigation).toBeCalledTimes(1)
        expect(navigateSpy).toBeCalledTimes(0)
        expect(event.preventDefault).toBeCalledTimes(1)
        expect(event.stopPropagation).toBeCalledTimes(1)
      })

      it('should allow a Nuxt Link navigate action when returning true', () => {
        const propsData = {
          target: '_self',
          href: '/',
          beforeNavigation: jest.fn(() => true),
        }
        createComponent(propsData, { CustomStub: customRouterStub() })

        const link = wrapper.find('a')
        const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() }
        link.trigger('click', event)

        expect(propsData.beforeNavigation).toBeCalledTimes(1)
        expect(navigateSpy).toBeCalledTimes(1)
        expect(event.preventDefault).toBeCalledTimes(0)
        expect(event.stopPropagation).toBeCalledTimes(0)
      })
    })
  })

  // describe('business requirements', () => {})
})
