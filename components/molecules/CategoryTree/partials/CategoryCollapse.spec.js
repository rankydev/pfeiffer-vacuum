import CategoryCollapse from './CategoryCollapse'
import Icon from '~/components/atoms/Icon/Icon'
import { category } from '../CategoryTree.stories.content'
import { shallowMount } from '@vue/test-utils'

describe('CategoryCollapse', () => {
  describe('initial state', () => {
    test('should render given required label', () => {
      const wrapper = shallowMount(CategoryCollapse, {
        propsData: { label: category.label },
      })

      const children = wrapper.find('.category-collapse__children')
      const button = wrapper.find('button-stub')
      const arrowIcon = wrapper.findComponent(Icon)

      expect(children.exists()).toBeFalsy()
      expect(arrowIcon.exists()).toBeTruthy()
      expect(button.attributes('label')).toBe(`${category.label} (0)`)
    })

    test('should render given all props data', () => {
      const wrapper = shallowMount(CategoryCollapse, {
        propsData: { ...category },
      })

      const button = wrapper.find('button-stub')

      expect(button.attributes('label')).toBe(
        `${category.label} (${category.count})`
      )
      expect(button.attributes('href')).toBe(category.href)
    })
  })

  describe('during interaction', () => {
    test('should change open state when icon is clicked', async () => {
      const wrapper = shallowMount(CategoryCollapse, {
        propsData: { label: category.label },
      })
      const arrowIcon = wrapper.findComponent(Icon)

      await arrowIcon.vm.$emit('click')

      const children = wrapper.find('.category-collapse__children')
      expect(children.exists()).toBeTruthy()
    })
  })
})
