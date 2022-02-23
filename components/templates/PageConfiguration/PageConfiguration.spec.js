import { shallowMount, createLocalVue } from '@vue/test-utils'
import PageConfiguration from './PageConfiguration.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('PageConfiguration', () => {
  describe('initial state', () => {
    describe('given content is set', () => {
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
