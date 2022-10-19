import getKey from '~/composables/useUniqueKey.js'

const getCategory = () => ({
  href: '/categoryName',
  productCount: 1000,
  category: {
    id: getKey('CATEGORY_ID'),
    name: 'Category Name',
  },
  children: [
    {
      category: {
        id: getKey('CATEGORY_ID'),
        name: 'Subcategory Name 1',
      },
      href: '/categoryName',
      productCount: 23,
    },
    {
      category: {
        id: getKey('CATEGORY_ID'),
        name: 'Subcategory Name 2',
      },
      href: '/categoryName',
      productCount: 76,
    },
    {
      category: {
        id: getKey('CATEGORY_ID'),
        name: 'Subcategory Name 3',
      },
      href: '/categoryName',
      productCount: 104,
    },
    {
      category: {
        id: getKey('CATEGORY_ID'),
        name: 'Subcategory Name 4',
      },
      href: '/categoryName',
      productCount: 123,
    },
    {
      category: {
        id: getKey('CATEGORY_ID'),
        name: 'Subcategory Name 5',
      },
      href: '/categoryName',
      productCount: 22,
    },
  ],
})

export const category = getCategory()

export default [
  getCategory(),
  getCategory(),
  getCategory(),
  getCategory(),
  getCategory(),
  getCategory(),
]
