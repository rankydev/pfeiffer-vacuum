import { shallowMount, mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import MainNavigationLevel from './MainNavigationLevel.vue'
import { useMenuStore } from '~/stores/menu'
import navigationEntries from './MainNavigationLevel.stories.content.js'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import Button from '~/components/atoms/Button/Button.vue'

let wrapper

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useRoute: () => {
      return { value: { path: '' } }
    },
  }
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
    it('should render given no navigation entries', () => {
      createComponent()
      expect(wrapper.exists).toBeTruthy()
    })

    describe('given no level', () => {
      const level = 0

      it('should use level 0 as default', () => {
        createComponent()
        expect(wrapper.vm.level).toBe(0)
      })

      it('should add the md hidden class given a MainNavLinkMobile component', () => {
        createComponent({ navigationEntries })

        const elements = wrapper.findAll(`.primary-nav-${level}__element`)

        expect(elements.at(0).attributes('class')).toContain('md:tw-hidden')
      })

      describe('given navigation entries', () => {
        it('should render all navigation entries', () => {
          createComponent({ navigationEntries })

          const links = wrapper.findAll(`.primary-nav-${level}__label`)

          expect(links.length).toBe(navigationEntries.length)

          navigationEntries.forEach((entry, idx) => {
            expect(links.at(idx).text()).toBe(entry.label)
          })
        })

        it('should not render any button', () => {
          createComponent()
          expect(wrapper.findComponent(Button).exists()).toBeFalsy()
        })

        describe('given navigation sub entries', () => {
          it('should render AnimatedCollapse component', () => {
            createComponent({ navigationEntries })

            const animCollapses = wrapper.findAllComponents(AnimatedCollapse)

            expect(animCollapses).toHaveLength(1)
          })

          it('should render MainNavigationLevel sub components', () => {
            createComponent({ navigationEntries })
            expect(
              wrapper.findComponent(MainNavigationLevel).exists()
            ).toBeTruthy()
          })

          it('should add an icon next to the link given mobile true and sub entries', () => {
            createComponent({ navigationEntries }, { isMobile: true })

            const links = wrapper.findAll(`.primary-nav-${level}__link`)

            expect(links.length).toBe(navigationEntries.length)

            const icon = links.at(1).findComponent(Icon)

            expect(icon.exists()).toBeTruthy()
            expect(icon.vm.icon).toBe('expand_more')
          })
        })
      })
    })

    describe('given level > 0', () => {
      const level = 1

      it('should use the level in classes', () => {
        createComponent({ navigationEntries, level })
        expect(wrapper.find(`.primary-nav-${level}`).exists()).toBeTruthy()
      })

      describe('given navigation entries', () => {
        it('should render all navigation entries', () => {
          createComponent({ navigationEntries, level })

          const links = wrapper.findAll(`.primary-nav-${level}__label`)

          expect(links.length).toBe(navigationEntries.length)

          navigationEntries.forEach((entry, idx) => {
            expect(links.at(idx).text()).toBe(entry.label)
          })
        })

        describe('given navigation sub entries', () => {
          it('should render AnimatedCollapse component given mobile true', () => {
            createComponent({ navigationEntries, level }, { isMobile: true })

            const animCollapses = wrapper.findAllComponents(AnimatedCollapse)

            expect(animCollapses).toHaveLength(1)
          })

          it('should render no AnimatedCollapse component given mobile false', () => {
            createComponent({ navigationEntries, level })

            const animCollapses = wrapper.findAllComponents(AnimatedCollapse)

            expect(animCollapses).toHaveLength(0)
          })

          it('should render MainNavigationLevel sub components', () => {
            createComponent({ navigationEntries, level })
            expect(
              wrapper.findComponent(MainNavigationLevel).exists()
            ).toBeTruthy()
          })

          it('should add an icon next to the link given mobile true and sub entries', () => {
            createComponent({ navigationEntries, level }, { isMobile: true })

            const links = wrapper.findAll(`.primary-nav-${level}__link`)

            expect(links.length).toBe(navigationEntries.length + 1)

            const icon = links.at(1).findComponent(Icon)

            expect(icon.exists()).toBeTruthy()
            expect(icon.vm.icon).toBe('expand_more')
          })
        })
      })
    })
  })

  describe('during interaction', () => {
    describe('given navigation entries', () => {
      describe('given viewport tablet/desktop', () => {
        it('should set active element when link was clicked', () => {
          createComponent({ navigationEntries })

          const links = wrapper.findAllComponents(Link)

          links.wrappers.forEach((link, idx) => {
            const hasSubEntries =
              navigationEntries[idx].navigationEntries?.length

            link.vm.beforeNavigation()

            expect(wrapper.vm.activeElement).toBe(hasSubEntries ? idx : null)
          })
        })

        it('should set active element to null when same link was clicked again', () => {
          createComponent({ navigationEntries })

          const links = wrapper.findAllComponents(Link)

          links.wrappers.forEach((link) => {
            link.vm.beforeNavigation()
            link.vm.beforeNavigation()
            expect(wrapper.vm.activeElement).toBe(null)
          })
        })
      })

      describe('given viewport mobile', () => {
        it('should set active element to null when same icon was clicked again', () => {
          createComponent({ navigationEntries }, { isMobile: true })

          const icons = wrapper.findAllComponents(Icon)

          icons.wrappers.forEach((icon) => {
            icon.trigger('click')
            icon.trigger('click')
            expect(wrapper.vm.activeElement).toBe(null)
            expect(icon.vm.icon).toBe('expand_more')
          })
        })
      })

      it('should set active element to null when menu active status changed to false', async () => {
        createComponent({ navigationEntries })

        const links = wrapper.findAllComponents(Link)
        const menu = useMenuStore()

        for (const [idx, link] of links.wrappers.entries()) {
          const hasSubEntries = navigationEntries[idx].navigationEntries?.length
          link.vm.beforeNavigation()

          if (hasSubEntries) expect(wrapper.vm.activeElement).toBe(idx)

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
