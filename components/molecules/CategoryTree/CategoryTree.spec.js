import CategoryTree from './CategoryTree'
import categories from './CategoryTree.stories.content'
import { shallowMount } from '@vue/test-utils'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule
  return {
    ...originalModule,
    useRoute: () => {
      return ref({
        query: 'searchTerm=hipace',
      })
    },
    useContext: () => {
      return {
        app: {
          localePath: (value) => value,
        },
      }
    },
  }
})

function createComponent(propsData = {}) {
  const stubs = { CategoryCollapse: true }
  return shallowMount(CategoryTree, { propsData, stubs })
}

describe('CategoryTree', () => {
  describe('initial state', () => {
    test('should render given required categories', () => {
      const wrapper = createComponent({ categories })

      const collapses = wrapper.findAll('categorycollapse-stub')

      expect(collapses.length).toBe(categories.length)
    })
  })
})
