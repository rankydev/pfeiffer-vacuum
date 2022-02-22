import { shallowMount, createLocalVue } from '@vue/test-utils'
import Page from './Page.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('Page', () => {
  test('inherits header from template', () => {
    const wrapper = shallowMount(Page, {
      localVue,
      propsData: {
        content: {
          template: {
            content: {
              header: {},
            },
          },
        },
      },
      mocks: {
        $config: {
          baseURL: '',
        },
        $route: {
          fullPath: '',
        },
      },
      provide: {
        getTranslatedSlugs() {
          return ''
        },
        getDefaultFullSlug() {
          return ''
        },
      },
    })
    expect(wrapper.vm.header).toBeDefined()
  })
})
