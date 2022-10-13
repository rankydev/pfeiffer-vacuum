import { product } from '~/components/molecules/ProductCard/ProductCard.stories.content.js'
import categories from '~/components/molecules/CategoryTree/CategoryTree.stories.content'
import {
  facets,
  sorts,
  currentQuery,
} from '~/components/molecules/Facets/Facets.stories.content'

export const headline = 'Headline'
export const products = [product, product, product]
export const pagination = 3
export const categoryTree = categories
export const facetFilters = facets
export const sortFilters = sorts
export const query = currentQuery

export default {
  headline,
  products,
  pagination,
  categoryTree,
  facetFilters,
  sortFilters,
  query,
}
