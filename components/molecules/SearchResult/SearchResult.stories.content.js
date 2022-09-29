import { product } from '~/components/molecules/ProductCard/ProductCard.stories.content.js'

export const headline = 'Headline'
export const products = [product, product, product]
export const pagination = 3

console.log('STORY', product, products)

export default {
  headline,
  products,
  pagination,
}
