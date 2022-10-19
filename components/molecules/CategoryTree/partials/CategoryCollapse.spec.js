import CategoryCollapse from './CategoryCollapse'
import Icon from '~/components/atoms/Icon/Icon'
import { category } from '../CategoryTree.stories.content'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'

let wrapper

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(() => ref({})),
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
  const stubs = {
    NuxtLink: true,
  }
  wrapper = shallowMount(CategoryCollapse, { propsData, stubs })
}

describe('CategoryCollapse', () => {
  describe('initial state', () => {
    test('should render given required label & count', () => {
      createComponent({
        label: category.category.name,
        count: category.productCount,
      })

      const link = wrapper.find('.category-collapse__parent')

      expect(link.text()).toBe(
        `${category.category.name} (${category.productCount})`
      )
    })

    test('should render given all props data', () => {
      createComponent({
        label: category.category.name,
        count: category.productCount,
        href: category.href,
        children: category.children,
      })

      const children = wrapper.findAll('.category-collapse__child')
      expect(children.length).toBe(category.children.length)
      category.children.forEach((item, i) => {
        expect(children.at(i).text()).toBe(
          `${item.category.name} (${item.productCount})`
        )
      })
    })
  })

  describe('during interaction', () => {
    test('should change open state when icon is clicked', async () => {
      createComponent({
        label: category.category.name,
        count: category.productCount,
        href: category.href,
        children: category.children,
      })
      const arrowIcon = wrapper.findComponent(Icon)

      await arrowIcon.vm.$emit('click')

      const children = wrapper.find('.category-collapse__children')

      expect(children.exists()).toBeTruthy()
    })
  })
})
