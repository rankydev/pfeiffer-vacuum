import ButtonGroup from './ButtonGroup'
import { shallowMount } from '@vue/test-utils'
import values from './ButtonGroup.stories.content'
import { val, examples } from './ButtonGroup.stories.content'

describe('ButtonGroup', () => {
  describe('initial state', () => {
    test.each([
      [2, examples[0]],
      [3, examples[1]],
      [4, examples[2]],
      [5, examples[3]],
    ])('should render component given value length of %i', (count, item) => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation()

      const wrapper = shallowMount(ButtonGroup, {
        propsData: {
          values: item,
        },
      })

      expect(errSpy).not.toBeCalled()
      expect(wrapper.findAll('.button-group__label')).toHaveLength(count)
    })
    test('should throw error given less than 2 values', () => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation()

      shallowMount(ButtonGroup, {
        propsData: {
          values: [val],
        },
      })

      expect(errSpy).toBeCalled()
    })
    test('should throw error given more than 5 values', () => {
      const errSpy = jest.spyOn(console, 'error').mockImplementation()

      shallowMount(ButtonGroup, {
        propsData: {
          values: [...values, val],
        },
      })

      expect(errSpy).toBeCalled()
    })
  })
})
