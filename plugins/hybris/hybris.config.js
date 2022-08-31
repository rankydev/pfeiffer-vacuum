const SHOP_CONTEXT = '/pfeifferwebservices/v2'
const BASE_SITE = 'pfeiffer'
const BASE_API_PATH = SHOP_CONTEXT + '/' + BASE_SITE

const CATALOG = 'pfeifferProductCatalog'
const CATALOG_VERSION = 'Online'

export default {
  // Products
  PRODUCTS_API: BASE_API_PATH + '/products',
  // Contact
  CONTACT_API: BASE_API_PATH + '/contact',
  // Countries
  COUNTRIES_API: BASE_API_PATH + '/countries',

  // Category
  CATEGORIES_API:
    BASE_API_PATH + '/catalogs/' + CATALOG + '/' + CATALOG_VERSION,
  CATEGORY_API:
    BASE_API_PATH +
    '/catalogs/' +
    CATALOG +
    '/' +
    CATALOG_VERSION +
    '/categories',
  CATEGORY_PRODUCTS_API: BASE_API_PATH + '/products/search',

  // Knowledge
  KNOWLEDGE_API: BASE_API_PATH + '/knowledge/documents',

  // Cart
  CARTS_CURRENT_USER_API: BASE_API_PATH + '/users/current/carts',
  CARTS_ANONYMOUS_API: BASE_API_PATH + '/users/anonymous/carts',

  // Shopping List
  SHOPPING_LISTS: BASE_API_PATH + '/users/current/shoppinglists',

  // Suggestions
  SUGGESTIONS_API: BASE_API_PATH + '/products/suggestions',

  // Login, register, user
  PASSWORD_FORGOTTEN_TOKEN: BASE_API_PATH + '/forgottenpasswordtokens',
  PASSWORD_RESET: BASE_API_PATH + '/resetpassword',
  DOUBLE_OPT_IN: BASE_API_PATH + '/doubleOptIn',
  USER_API: BASE_API_PATH + '/users/current',
  REGISTER_API: BASE_API_PATH + '/users/anonymous/orgCustomers',

  // Orders
  ORDER_API: BASE_API_PATH + '/users/current/orders',
  OCI_ORDER_API: BASE_API_PATH + '/users/current/carts',

  // RMA
  RMA_API: BASE_API_PATH + '/rma',
}
