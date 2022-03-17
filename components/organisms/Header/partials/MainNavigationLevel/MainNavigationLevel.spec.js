import { shallowMount, mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import MainNavigationLevel from './MainNavigationLevel.vue'
import { useMenuStore } from '~/stores/menu'
import navigationEntries from './MainNavigationLevel.stories.content.js'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'

let wrapper

const eventMock = () => ({
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
})

function createComponent(propsData = {}, { isMobile, shallow = true } = {}) {
  const $breakpoints = { isMobile: ref(isMobile || false) }
  const mocks = { $nuxt: { context: { app: { $breakpoints } } } }
  const options = { propsData, mocks }

  wrapper = shallow
    ? shallowMount(MainNavigationLevel, options)
    : mount(MainNavigationLevel, options)
}

describe('MainNavigationLevel', () => {
  describe('initial state', () => {
    it('should render all navigation entries', () => {
      createComponent({ navigationEntries })

      const links = wrapper.findAll('.primary-nav__link')

      expect(links.length).toBe(navigationEntries.length)

      navigationEntries.forEach((entry, idx) => {
        expect(links.at(idx).text()).toBe(entry.label)
      })
    })

    it('should render without navigation entries', () => {
      createComponent()
      expect(wrapper.exists).toBeTruthy()
    })

    describe('given navigation entries', () => {
      it('should render all navigation entries', () => {
        createComponent({ navigationEntries })

        const links = wrapper.findAll('.primary-nav__label')

        expect(links.length).toBe(navigationEntries.length)

        navigationEntries.forEach((entry, idx) => {
          expect(links.at(idx).text()).toBe(entry.label)
        })
      })

      it('should add level class to DOM', () => {
        expect(wrapper.attributes('class')).toMatch('primary-nav--level-0')
      })

      it('should add an icon next to the link when viewport mobile', () => {
        createComponent({ navigationEntries }, { isMobile: true })

        const links = wrapper.findAll('.primary-nav__link')

        expect(links.length).toBe(navigationEntries.length)

        links.wrappers.forEach((link) => {
          const icon = link.findComponent(Icon)
          expect(icon.exists()).toBeTruthy()
          expect(icon.vm.icon).toBe('expand_more')
        })
      })
    })
  })

  describe('during interaction', () => {
    describe('given navigation entries', () => {
      describe('given viewport tablet/desktop', () => {
        it('should prevent default behavior when link was clicked', () => {
          createComponent({ navigationEntries })

          const links = wrapper.findAllComponents(Link)

          links.wrappers.forEach((link) => {
            const $event = eventMock()
            const result = link.vm.beforeNavigation($event)

            expect(result).toBe(false)
            expect($event.preventDefault).toBeCalledTimes(1)
            expect($event.stopPropagation).toBeCalledTimes(1)
          })
        })

        it('should set active elment when link was clicked', () => {
          createComponent({ navigationEntries })

          const links = wrapper.findAllComponents(Link)

          links.wrappers.forEach((link, idx) => {
            link.vm.beforeNavigation(eventMock())
            expect(wrapper.vm.activeElement).toBe(idx)
          })
        })

        it('should set active elment to null when same link was clicked again', () => {
          createComponent({ navigationEntries })

          const links = wrapper.findAllComponents(Link)

          links.wrappers.forEach((link, idx) => {
            link.vm.beforeNavigation(eventMock())
            link.vm.beforeNavigation(eventMock())
            expect(wrapper.vm.activeElement).toBe(null)
          })
        })
      })

      describe('given viewport mobile', () => {
        it('should not prevent default behavior when link was clicked', () => {
          createComponent({ navigationEntries }, { isMobile: true })

          const links = wrapper.findAllComponents(Link)

          links.wrappers.forEach((link) => {
            const $event = eventMock()
            const result = link.vm.beforeNavigation($event)

            expect(result).toBe(true)
            expect($event.preventDefault).not.toBeCalled()
            expect($event.stopPropagation).not.toBeCalled()
          })
        })

        it('should set active elment when icon was clicked', async () => {
          createComponent({ navigationEntries }, { isMobile: true })

          const icons = wrapper.findAllComponents(Icon)

          for (const [idx, icon] of icons.wrappers.entries()) {
            icon.trigger('click')
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.activeElement).toBe(idx)
            expect(icon.vm.icon).toBe('expand_less')
          }
        })

        it('should set active elment to null when same icon was clicked again', () => {
          createComponent({ navigationEntries }, { isMobile: true })

          const icons = wrapper.findAllComponents(Icon)

          icons.wrappers.forEach((icon, idx) => {
            icon.trigger('click')
            icon.trigger('click')
            expect(wrapper.vm.activeElement).toBe(null)
            expect(icon.vm.icon).toBe('expand_more')
          })
        })
      })

      it('should set active elment to null when menu active status changed to false', async () => {
        createComponent({ navigationEntries })

        const links = wrapper.findAllComponents(Link)
        const menu = useMenuStore()

        for (const [idx, link] of links.wrappers.entries()) {
          link.vm.beforeNavigation(eventMock())
          expect(wrapper.vm.activeElement).toBe(idx)

          await wrapper.vm.$nextTick()
          menu.close()
          await wrapper.vm.$nextTick()

          expect(wrapper.vm.activeElement).toBe(null)
        }
      })
    })
  })

  // describe('business requirements', () => {})
})
