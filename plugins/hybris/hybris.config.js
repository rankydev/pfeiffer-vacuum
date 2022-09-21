const SHOP_CONTEXT = '/pfeifferwebservices/v2'
const BASE_SITE = 'pfeiffer'
const BASE_API_PATH = SHOP_CONTEXT + '/' + BASE_SITE

const CATEGORIES_API = BASE_API_PATH + '/catalogs/pfeifferProductCatalog/Online'

export default {
  // Products
  PRODUCTS_API: BASE_API_PATH + '/products',
  // Categories
  CATEGORIES_API,
  CATEGORY_API: CATEGORIES_API + '/categories',
  // Contact
  CONTACT_API: BASE_API_PATH + '/contact',
  // Countries
  COUNTRIES_API: BASE_API_PATH + '/countries',
}
