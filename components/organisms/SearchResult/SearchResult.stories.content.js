import { product } from '~/components/molecules/ProductCard/ProductCard.stories.content.js'
import categories from '~/components/molecules/CategoryTree/CategoryTree.stories.content'

export const headline = 'Headline'
export const products = [product, product, product]
export const pagination = 3
export const categoriyTree = categories

export default {
  headline,
  products,
  pagination,
}
