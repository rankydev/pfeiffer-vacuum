import SearchResult from './SearchResult'
import {
  products,
  pagination,
  categoryTree,
  facetFilters,
  query,
  sortFilters,
} from './SearchResult.stories.content.js'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import CategoryTree from '~/components/molecules/CategoryTree/CategoryTree.vue'
import Facets from '~/components/molecules/Facets/Facets.vue'
import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection.vue'

import { shallowMount } from '@vue/test-utils'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(SearchResult, { propsData })
}

describe('SearchResult', () => {
  describe('initial state', () => {
    it('should render with given only required props', () => {
      const propsData = {
        facets: facetFilters,
        pagination,
      }
      createComponent(propsData)
      const searchResultComponent = wrapper.find('.search-result')
      expect(searchResultComponent.exists()).toBeTruthy()
    })

    it('should provide all given props to the correct components', () => {
      const propsData = {
        products,
        pagination,
        categories: categoryTree,
        facets: facetFilters,
        currentQuery: query,
        sorts: sortFilters,
      }
      createComponent(propsData)

      const productGrid = wrapper.findComponent(ProductCardGrid)
      const pages = wrapper.findComponent(Pagination)
      const catTree = wrapper.findComponent(CategoryTree)
      const facets = wrapper.findComponent(Facets)
      const sizeSelection = wrapper.findComponent(CategoryPageSizeSelection)

      expect(productGrid.vm.products).toBe(products)
      expect(pages.vm.totalPages).toBe(pagination.totalPages)
      expect(facets.vm.facets).toBe(facetFilters)
      expect(catTree.vm.categories).toBe(categoryTree)
      expect(sizeSelection.vm.active).toBe(pagination.pageSize)
    })
  })
})
