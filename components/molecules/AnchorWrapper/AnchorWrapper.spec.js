import { createLocalVue, shallowMount } from '@vue/test-utils'
import AnchorWrapper from './AnchorWrapper.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

const propsDataMock = {
  id: 'testAnchor',
  content: [
    {
      uid: '164e89d0-5d6b-4d97-a66a-afc6f39305d3',
      component: 'Icon',
    },
  ],
}

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  wrapper = shallowMount(AnchorWrapper, { propsData, localVue, stubs })
}

describe('AnchorWrapper', () => {
  describe('initial state', () => {
    test('should render given only required id', () => {
      createComponent({
        id: propsDataMock.id,
      })

      expect(wrapper.find(propsDataMock.id)).toBeTruthy()
    })

    test('should render given nested component example', () => {
      createComponent(propsDataMock)

      const subComponent = wrapper.find('nuxtdynamic-stub')

      expect(subComponent).toBeTruthy()
      expect(subComponent.attributes('component')).toBe(
        propsDataMock.content[0].component
      )
    })
  })
})
