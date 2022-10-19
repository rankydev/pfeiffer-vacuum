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
import {
  currentQuery,
  facetQuery,
} from '~/components/molecules/Facets/Facets.stories.content'
import { shallowMount } from '@vue/test-utils'

let wrapper
const mockRouterPush = jest.fn()
const { filterTerms } = currentQuery.query

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(() => ({ value: {} })),
    useRouter: jest.fn(() => ({
      push: jest.fn((e) => mockRouterPush(e)),
    })),
    useContext: jest.fn(() => ({
      app: { localePath: jest.fn((e) => e) },
    })),
  }
})

function createComponent(propsData = {}) {
  wrapper = shallowMount(SearchResult, { propsData })
}

describe('SearchResult', () => {
  describe('initial state', () => {
    it('should render given only required props', () => {
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

  describe('during interaction', () => {
    it('should push facets on change', async () => {
      const propsData = {
        products,
        pagination,
        categories: categoryTree,
        facets: facetFilters,
        currentQuery: query,
        sorts: sortFilters,
      }
      createComponent(propsData)

      const facets = wrapper.findComponent(Facets)
      await facets.vm.$emit('updateFacets', filterTerms)

      expect(mockRouterPush).toBeCalledTimes(1)
      expect(mockRouterPush).toBeCalledWith({
        query: { currentPage: 1, facets: facetQuery },
      })
    })
  })
})
