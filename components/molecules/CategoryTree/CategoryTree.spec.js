import CategoryTree from './CategoryTree'
import categories from './CategoryTree.stories.content'
import { shallowMount } from '@vue/test-utils'

describe('CategoryTree', () => {
  describe('initial state', () => {
    test('should render given required categories', () => {
      const wrapper = shallowMount(CategoryTree, { propsData: { categories } })

      const collapses = wrapper.findAll('categorycollapse-stub')

      expect(collapses.length).toBe(categories.length)
    })
  })
})
