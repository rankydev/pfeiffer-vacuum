import { shallowMount, createLocalVue } from '@vue/test-utils'
import PageConfiguration from './PageConfiguration.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('PageConfiguration', () => {
  let wrapper
  function createComponent(propsData = {}) {
    wrapper = shallowMount(PageConfiguration, {
      localVue,
      propsData: {
        content: {
          template: {},
        },
        ...propsData,
      },
      stubs: {
        NuxtDynamic: true,
      },
    })
  }

  describe('initial state', () => {
    describe('given content is set', () => {
      it('should render components', () => {
        const propsData = {
          content: {
            top: [
              {
                component: 'Top',
              },
            ],
            header: [
              {
                component: 'Header',
              },
            ],
            stage: [
              {
                component: 'Stage',
              },
            ],
            body: [
              {
                component: 'Body',
              },
            ],
            bottom: [
              {
                component: 'Bottom',
              },
            ],
            footer: [
              {
                component: 'Footer',
              },
            ],
          },
        }
        createComponent(propsData)
        const sections = wrapper.findAll('nuxtdynamic-stub')

        expect(sections.at(0).attributes('component')).toBe(
          propsData.content.top[0].component
        )
        expect(sections.at(1).attributes('component')).toBe(
          propsData.content.header[0].component
        )
        expect(sections.at(2).attributes('component')).toBe(
          propsData.content.stage[0].component
        )
        expect(sections.at(3).attributes('component')).toBe(
          propsData.content.body[0].component
        )
        expect(sections.at(4).attributes('component')).toBe(
          propsData.content.bottom[0].component
        )
        expect(sections.at(5).attributes('component')).toBe(
          propsData.content.footer[0].component
        )
      })

      it('should set content', () => {
        const wrapper = shallowMount(PageConfiguration, {
          localVue,
          propsData: {
            content: {
              top: {},
              header: {},
              stage: {},
              body: {},
              bottom: {},
              footer: {},
            },
          },
        })
        expect(wrapper.vm.top).toBeDefined()
        expect(wrapper.vm.header).toBeDefined()
        expect(wrapper.vm.stage).toBeDefined()
        expect(wrapper.vm.body).toBeDefined()
        expect(wrapper.vm.bottom).toBeDefined()
        expect(wrapper.vm.footer).toBeDefined()
      })
    })
  })
})
