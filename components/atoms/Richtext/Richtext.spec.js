import { createLocalVue, shallowMount } from '@vue/test-utils'
import {
  headlines,
  linksTargetBlank,
  linksTargetSelf,
  orderedList,
  styleOptions,
  unorderedList,
} from './Richtext.stories.content'
import Richtext from './Richtext.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(Richtext, { localVue, propsData })
}

describe('Richtext', () => {
  describe('initial state', () => {
    test('should render correct richtext given all headlines and sublines', () => {
      createComponent({ richtext: headlines })

      expect(wrapper.find('h2')).toBeTruthy()
      expect(wrapper.find('h3')).toBeTruthy()
      expect(wrapper.find('h4')).toBeTruthy()
      expect(wrapper.find('h5')).toBeTruthy()
      expect(wrapper.find('h6')).toBeTruthy()
      expect(wrapper.find('.tw-subline-2')).toBeTruthy()
      expect(wrapper.find('.tw-subline-3')).toBeTruthy()
      expect(wrapper.find('.tw-subline-4')).toBeTruthy()
      expect(wrapper.find('.tw-subline-5')).toBeTruthy()
      expect(wrapper.find('.tw-subline-6')).toBeTruthy()
    })

    test('should render correct richtext given sub and super style options', () => {
      createComponent({ richtext: styleOptions })

      expect(wrapper.find('.superscript')).toBeTruthy()
      expect(wrapper.find('.subscript')).toBeTruthy()
    })

    test('should render correct richtext given different link types', () => {
      createComponent({ richtext: linksTargetSelf })

      expect(wrapper.findAll('a')).toHaveLength(5)
    })

    test('should render correct richtext given unordered list', () => {
      createComponent({ richtext: unorderedList })

      expect(wrapper.findAll('ul')).toHaveLength(4)
      expect(wrapper.findAll('li')).toHaveLength(6)
    })

    test('should render correct richtext given ordered list', () => {
      createComponent({ richtext: orderedList })

      expect(wrapper.findAll('ol')).toHaveLength(3)
      expect(wrapper.findAll('li')).toHaveLength(6)
    })
  })

  describe('during interaction', () => {
    const useRouterMock = jest.spyOn(
      require('@nuxtjs/composition-api'),
      'useRouter'
    )
    const routerMock = { push: jest.fn() }

    beforeAll(() => useRouterMock.mockImplementation(() => routerMock))
    beforeEach(() => routerMock.push.mockClear())
    afterAll(() => useRouterMock.mockRestore())

    test('should not trigger router push on non link elements', async () => {
      createComponent({ richtext: '<div>Some div</div>' })
      const button = wrapper.find('div')
      await button.trigger('click')

      expect(routerMock.push).toBeCalledTimes(0)
    })

    describe('given target _blank', () => {
      test.each([['external'], ['internal'], ['anchor'], ['mail'], ['asset']])(
        'should not trigger router push on %s links',
        async (type) => {
          createComponent({ richtext: linksTargetBlank })
          const link = wrapper.find(`.link-${type}`)
          await link.trigger('click')

          expect(routerMock.push).toBeCalledTimes(0)
        }
      )
    })

    describe('given target _self', () => {
      test.each([['external'], ['mail'], ['asset']])(
        'should not trigger router push on %s links',
        async (type) => {
          createComponent({ richtext: linksTargetSelf })
          const link = wrapper.find(`.link-${type}`)
          await link.trigger('click')

          expect(routerMock.push).toBeCalledTimes(0)
        }
      )

      test.each([['internal'], ['anchor']])(
        'should trigger router push and prevent default on %s links',
        async (type) => {
          createComponent({ richtext: linksTargetSelf })
          const link = wrapper.find(`.link-${type}`)
          const preventSpy = jest.fn()

          link.element.addEventListener(`click`, (e) => {
            e.preventDefault = preventSpy
          })

          await link.trigger('click')

          expect(routerMock.push).toBeCalledTimes(1)
          expect(preventSpy).toBeCalledTimes(1)
        }
      )
    })
  })
})
