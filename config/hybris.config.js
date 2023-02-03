import { joinURL } from 'ufo'

const SHOP_CONTEXT = '/pfeifferwebservices/v2'
const BASE_SITE = 'pfeiffer'
const BASE_API_PATH = joinURL(SHOP_CONTEXT + '/' + BASE_SITE)

const CATALOG = 'pfeifferProductCatalog'
const CATALOG_VERSION = 'Online'

export default {
  // Products
  PRODUCTS_API: joinURL(BASE_API_PATH + '/products'),
  // Contact
  CONTACT_API: joinURL(BASE_API_PATH + '/contact'),
  // Countries
  COUNTRIES_API: joinURL(BASE_API_PATH + '/countries'),

  // Category
  CATEGORIES_API: joinURL(
    BASE_API_PATH + '/catalogs/' + CATALOG + '/' + CATALOG_VERSION
  ),
  CATEGORY_API: joinURL(
    BASE_API_PATH +
      '/catalogs/' +
      CATALOG +
      '/' +
      CATALOG_VERSION +
      '/categories'
  ),
  CATEGORY_PRODUCTS_API: joinURL(BASE_API_PATH + '/products/search'),

  // Knowledge
  KNOWLEDGE_API: joinURL(BASE_API_PATH + '/knowledge/documents'),

  // Cart
  CARTS_CURRENT_USER_API: joinURL(BASE_API_PATH + '/users/current/carts'),
  CARTS_ANONYMOUS_API: joinURL(BASE_API_PATH + '/users/anonymous/carts'),

  // Shopping List
  SHOPPING_LISTS: joinURL(BASE_API_PATH + '/users/current/shoppinglists'),

  // Suggestions
  SUGGESTIONS_API: joinURL(BASE_API_PATH + '/products/suggestions'),

  // Login, register, user
  PASSWORD_FORGOTTEN_TOKEN: joinURL(BASE_API_PATH + '/forgottenpasswordtokens'),
  PASSWORD_RESET: joinURL(BASE_API_PATH + '/resetpassword'),
  DOUBLE_OPT_IN: joinURL(BASE_API_PATH + '/doubleOptIn'),
  USER_API: joinURL(BASE_API_PATH + '/users/current'),
  REGISTER_API: joinURL(BASE_API_PATH + '/users/anonymous/orgCustomers'),
  ADD_COMPANY: joinURL(BASE_API_PATH + '/users/current/orgCustomers'),

  // Orders
  ORDER_API: joinURL(BASE_API_PATH + '/users/current/orders'),
  OCI_ORDER_API: joinURL(BASE_API_PATH + '/users/current/carts'),

  // RMA
  RMA_API: joinURL(BASE_API_PATH + '/rma'),
}
