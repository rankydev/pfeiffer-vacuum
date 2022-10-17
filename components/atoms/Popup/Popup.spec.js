import { mount } from '@vue/test-utils'
import Popup from '~/components/atoms/Popup/Popup.vue'
import { onClickOutside } from '@vueuse/core'
import { expect } from '@jest/globals'

jest.useFakeTimers()

jest.mock('@vueuse/core', () => {
  const originalModule = jest.requireActual('@vueuse/core')
  return { __esModule: true, ...originalModule, onClickOutside: jest.fn() }
})

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get: () => 100,
  },
  offsetTop: {
    get: () => 50,
  },
})

window.getComputedStyle = () => ({
  styles: { marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10 },
})

const orgSetup = Popup.setup
const contentEle = document.createElement('div')
const activatorEle = document.createElement('div')

activatorEle.getBoundingClientRect = () => ({ width: 100, height: 100 })
contentEle.getBoundingClientRect = () => ({ width: 200, height: 200 })

const refs = { activator: activatorEle, content: contentEle }
const setup = (props) => orgSetup(props, { refs })
Popup.setup = setup

let wrapper

function createComponent(propsData = {}, { slots, Component } = {}) {
  wrapper = mount(Component || Popup, { propsData, slots })
}

const activator = `<button>Some Activator</button>`
const content = `<div>Some Content</div>`

const parentComponent = {
  components: { Popup },
  template: `<Popup>
  <template #activator="params">{{ getParams(params) }}</template>
  <template>Some content</template>
  </Popup>`,
  setup() {
    return {
      getParams: jest.fn(() => ''),
    }
  },
}

describe('Popup', () => {
  describe('initial state', () => {
    test('should render activator slot', () => {
      createComponent({}, { slots: { activator, default: content } })

      const domActivator = wrapper.find('.popup__activator > *')

      expect(domActivator.html()).toBe(activator)
    })

    test('should provide togglePopup function to the slot', () => {
      createComponent({}, { Component: parentComponent })

      expect(wrapper.vm.getParams).toBeCalledWith({
        togglePopup: expect.any(Function),
      })
    })

    test('should not render default slot', () => {
      createComponent({}, { slots: { activator, default: content } })

      const domContent = wrapper.find('.popup__content > *')

      expect(domContent.exists()).toBeFalsy()
    })
  })

  describe('during interaction', () => {
    describe('given a click on the activator', () => {
      test('should render default slot', async () => {
        createComponent({}, { slots: { activator, default: content } })

        wrapper.vm.togglePopup()
        await wrapper.vm.$nextTick()

        const domContent = wrapper.find('.popup__content > *')
        expect(domContent.html()).toBe(content)
      })
      test('should register an outside click event listener', async () => {
        onClickOutside.mockClear()
        createComponent({}, { slots: { activator, default: content } })

        wrapper.vm.togglePopup()
        jest.runAllTimers()

        expect(onClickOutside).toBeCalledWith(
          expect.any(HTMLDivElement),
          expect.any(Function)
        )
      })

      test('should set left and top styles values', async () => {
        createComponent({}, { slots: { activator, default: content } })

        wrapper.vm.togglePopup()
        await wrapper.vm.$nextTick()

        const domContent = wrapper.find('.popup__content')

        expect(domContent.attributes('style')).toBe('left: 50px; top: 150px;')
      })

      test('should not render default slot given a second click', async () => {
        createComponent({}, { slots: { activator, default: content } })

        wrapper.vm.togglePopup()
        await wrapper.vm.$nextTick()

        wrapper.vm.togglePopup()
        await wrapper.vm.$nextTick()

        const domContent = wrapper.find('.popup__content > *')

        expect(domContent.exists()).toBeFalsy()
      })

      test('should not render default slot given an outside click', async () => {
        onClickOutside.mockClear()
        createComponent({}, { slots: { activator, default: content } })

        wrapper.vm.togglePopup()
        jest.runAllTimers()

        const closePopup = onClickOutside.mock.calls.pop()[1]

        // simulating outside click
        closePopup()
        await wrapper.vm.$nextTick()

        const domContent = wrapper.find('.popup__content > *')
        expect(domContent.exists()).toBeFalsy()
      })
    })
  })

  // describe('business requirements', () => {})
})
