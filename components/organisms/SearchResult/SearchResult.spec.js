import SearchResult from './SearchResult'
import {
  products,
  pagination,
  categoriyTree,
} from './SearchResult.stories.content.js'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import CategoryTree from '~/components/molecules/CategoryTree/CategoryTree.vue'

import { shallowMount } from '@vue/test-utils'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(SearchResult, { propsData })
}

describe('SearchResult', () => {
  describe('initial state', () => {
    it('should render without props', () => {
      createComponent()
      const searchResultComponent = wrapper.find('.search-result')
      expect(searchResultComponent.exists()).toBeTruthy()
    })

    it('should provide all given props to the correct components', () => {
      const propsData = { products, pagination, categories: categoriyTree }
      createComponent(propsData)

      const productGrid = wrapper.findComponent(ProductCardGrid)
      const pages = wrapper.findComponent(Pagination)
      const catTree = wrapper.findComponent(CategoryTree)

      expect(productGrid.vm.products).toBe(products)
      expect(pages.vm.totalPages).toBe(pagination)
      expect(catTree.vm.categories).toBe(categoriyTree)
    })
  })
})
