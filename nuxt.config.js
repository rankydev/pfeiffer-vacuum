import {
  PATH_EMPOLIS,
  PATH_SHOP,
  PATH_SHOP_IMAGES,
  PATH_DATASOURCES,
  PATH_VACUUM_CALC,
  PATH_STORYBLOK_API,
  PATH_STORYBLOK_ASSETS,
  PATH_STORYBLOK_IMAGES,
} from './server/constants.js'
import {
  languageCodes,
  defaultLanguageCode,
  locales,
  dateTimeFormats,
} from './i18n.config'

// only set to true during LSG build. Otherwise should default to false
const isStorybook = process.env.STORYBOOK || false
const baseURL = process.env.BASE_URL || 'http://localhost:3000'
const regionBase =
  process.env.CURRENT_REGION_CODE || process.env.DEFAULT_REGION_CODE

export default {
  srcDir: '',
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    title: 'Pfeiffer Vacuum', // @todo make dynamic
    htmlAttrs: {
      lang: 'en-EN', // @todo make dynamic
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'application/javascript',
        innerHTML: `window.UC_UI_DOMAINS = { crossDomainConsentSharingIFrame: '${baseURL}/${process.env.DEFAULT_REGION_CODE}/cross-domain-bridge.html' };`,
      },
      {
        src: 'https://app.usercentrics.eu/browser-ui/latest/loader.js',
        id: 'usercentrics-cmp',
        'data-settings-id': process.env.USERCENTRICS_ID,
        'data-tcf-enabled': true,
        defer: true,
      },
      {
        type: 'text/plain',
        'data-usercentrics': 'Google Tag Manager',
        innerHTML:
          "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
          "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
          "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
          "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
          "})(window,document,'script','dataLayer','" +
          process.env.GOOGLE_TAG_MANAGER_ID +
          "');",
      },
    ],

    // @todo add link alternate href lang
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/style.scss'],

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },

  ...(!isStorybook && {
    router: {
      base: `/${regionBase}/`,
      extendRoutes(routes) {
        // add root page to the routed object
        routes.push({
          name: 'Home',
          path: '/',
          component: './pages/_site/_.vue',
        })

        for (const key in routes) {
          routes[key].caseSensitive = true
        }
      },
    },
  }),

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/helper/breakpoints',
    '~/plugins/zoomOnHover',
    '~/plugins/touchEvents',
    '~/plugins/tooltip',
    { src: '~/plugins/analytics/datalayer', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/templates',
    '~/components/atoms',
    '~/components/molecules',
    '~/components/organisms',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', { cache: false }],
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
    '@nuxt/postcss8',
    '@nuxtjs/svg-sprite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-helmet',
    '@txp-cms/storyblok',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
    // Link to prometheus module:  https://www.npmjs.com/package/nuxt-prometheus-module
    'nuxt-prometheus-module',
    '@nuxtjs/apollo',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  // internationalization configuration, see https://i18n.nuxtjs.org/options-reference
  i18n: {
    locales: locales,
    defaultLocale: defaultLanguageCode,
    strategy: isStorybook ? 'no_prefix' : 'prefix',
    langDir: '~/i18n/',
    /*
        Browser language from 'nuxt-i18n' detection disabled,
        because redirection is always processed on first request without cookie,
        this causes problems when switching languages in storyblok.
       */
    // detectBrowserLanguage: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18nLanguage',
      redirectOn: 'no prefix',
    },
    vueI18n: {
      fallbackLocale: defaultLanguageCode,
      dateTimeFormats: dateTimeFormats,
    },
  },

  // Vue Toastification config, see: https://github.com/Maronato/vue-toastification
  toast: {
    shareAppContext: true,
    position: 'bottom-center',
    transition: 'Vue-Toastification__fade',
    timeout: false,
    closeButton: false,
    icon: false,
    containerClassName: 'pv-toast',
    toastClassName: 'pv-toast',
  },

  // SVG Sprite Configuration, see: https://github.com/nuxt-community/svg-sprite-module
  svgSprite: {
    input: '~/assets/svgSource',
    output: '~/assets/svgSprite',
  },

  // TXP-CMS Storyblok Configuration, see: https://txp-cms.dev/integrations/storyblok
  storyblok: {
    endpoint: `${baseURL}/${regionBase}${PATH_STORYBLOK_API}`,
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    version: process.env.STORYBLOK_VERSION,
    defaultLanguage: defaultLanguageCode,
    languageCodes: languageCodes.join(','),
    defaultRegion: process.env.DEFAULT_REGION_CODE,
    regions: process.env.REGION_CODES,
    resolveRelations: process.env.STORYBLOK_RESOLVE_RELATIONS,
    resolveLinks: process.env.STORYBLOK_RESOLVE_LINKS,
    resolveAssets: process.env.STORYBLOK_RESOLVE_ASSETS,
    spaceId: process.env.STORYBLOK_SPACE_ID,
    contentTypes: process.env.STORYBLOK_CONTENT_TYPES,
    exclude:
      process.env.STORYBLOK_EXCLUDE_ROUTES &&
      (process.env.STORYBLOK_EXCLUDE_ROUTES || '').split(','),
    linksTransformer: './resolver/linksTransformer',
    resolver: {
      multilink: './resolver/linkResolver',
      asset: './resolver/assetResolver',
    },
  },

  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },

  publicRuntimeConfig: {
    baseURL,
    axios: {
      baseURL,
    },
    LANGUAGE_CODES: languageCodes,
    DEFAULT_LANGUAGE_CODE: defaultLanguageCode,
    REGION_CODES: process.env.REGION_CODES || 'global',
    DEFAULT_REGION_CODE: process.env.DEFAULT_REGION_CODE || 'global',
    CURRENT_REGION_CODE: regionBase || 'global',
    USERCENTRICS_PRIVACY_PATH: process.env.USERCENTRICS_PRIVACY_PATH,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    // keycloak
    KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL,
    KEYCLOAK_REALM_NAME: process.env.KEYCLOAK_REALM_NAME,
    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    // empolis
    EMPOLIS_TIMEOUT: process.env.EMPOLIS_TIMEOUT,
    EMPOLIS_STAGE: process.env.EMPOLIS_STAGE,
    EMPOLIS_PATH: process.env.EMPOLIS_PATH,
    EMPOLIS_GUEST_TOKEN_URL: process.env.EMPOLIS_GUEST_TOKEN_URL,
    EMPOLIS_SSO_PATH: process.env.EMPOLIS_SSO_PATH,

    // version info
    CI_COMMIT_REF_NAME: process.env.CI_COMMIT_REF_NAME,
    CI_COMMIT_SHORT_SHA: process.env.CI_COMMIT_SHORT_SHA,
    ...(process.env.NODE_ENV === 'development' && {
      CI_PROJECT_URL: process.env.CI_PROJECT_URL,
      NODE_ENV: process.env.NODE_ENV,
    }),
    CONSOLA_LEVEL: process.env.CONSOLA_LEVEL,
    // Vacuum Calculator
    VACUUM_CALCULATOR_BASE_URL: process.env.VACUUM_CALCULATOR_BASE_URL,
  },

  privateRuntimeConfig: {
    // empolis
    EMPOLIS_AUTH_URL: process.env.EMPOLIS_AUTH_URL,
    EMPOLIS_USERNAME_CUSTOMER: process.env.EMPOLIS_USERNAME_CUSTOMER,
    EMPOLIS_PASSWORD_CUSTOMER: process.env.EMPOLIS_PASSWORD_CUSTOMER,
    EMPOLIS_USERNAME_INTERNAL_LEVEL_0:
      process.env.EMPOLIS_USERNAME_INTERNAL_LEVEL_0,
    EMPOLIS_PASSWORD_INTERNAL_LEVEL_0:
      process.env.EMPOLIS_PASSWORD_INTERNAL_LEVEL_0,
    EMPOLIS_USERNAME_INTERNAL_LEVEL_1:
      process.env.EMPOLIS_USERNAME_INTERNAL_LEVEL_1,
    EMPOLIS_PASSWORD_INTERNAL_LEVEL_1:
      process.env.EMPOLIS_PASSWORD_INTERNAL_LEVEL_1,
    EMPOLIS_USERNAME_INTERNAL_LEVEL_2:
      process.env.EMPOLIS_USERNAME_INTERNAL_LEVEL_2,
    EMPOLIS_PASSWORD_INTERNAL_LEVEL_2:
      process.env.EMPOLIS_PASSWORD_INTERNAL_LEVEL_2,
    EMPOLIS_CLIENT_ID: process.env.EMPOLIS_CLIENT_ID,
    EMPOLIS_CLIENT_SECRET: process.env.EMPOLIS_CLIENT_SECRET,
    // storyblok
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    // SAP Commerce Cloud
    SHOP_BASE_URL: process.env.SHOP_BASE_URL,
    SHOP_IMAGE_URL: process.env.SHOP_IMAGE_URL,
  },

  //nuxt-img configuration, see: https://image.nuxtjs.org/components/nuxt-img
  image: {
    // fallback if provider is not defined
    provider: 'storyblok',
    providers: {
      hybris: {
        provider: '~/providers/images/hybrisProvider',
      },
    },
    storyblok: {
      baseURL: `/${regionBase}${PATH_STORYBLOK_IMAGES}`,
    },
  },
  // Will register file from project server/middleware directory to handle API calls
  serverMiddleware: [
    { prefix: false, handler: '~/server/middleware/oci.js' },
    ...(isStorybook
      ? []
      : [
          {
            prefix: false,
            handler: '~/server/middleware/region-redirect.js',
          },
        ]),
    {
      path: PATH_SHOP,
      handler: '~/server/middleware/shop-api.js',
    },
    {
      path: PATH_SHOP_IMAGES,
      handler: '~/server/middleware/shop-images.js',
    },
    {
      path: PATH_STORYBLOK_IMAGES,
      handler: '~/server/middleware/storyblok-images.js',
    },
    {
      path: PATH_STORYBLOK_ASSETS,
      handler: '~/server/middleware/storyblok-assets.js',
    },
    {
      path: PATH_STORYBLOK_API,
      handler: '~/server/middleware/storyblok-api.js',
    },
    {
      path: PATH_EMPOLIS,
      handler: '~/server/middleware/empolis-authorization.js',
    },
    {
      path: PATH_EMPOLIS,
      handler: '~/server/middleware/empolis.js',
    },
    {
      path: PATH_DATASOURCES,
      handler: '~/server/middleware/datasources.js',
    },
    {
      path: PATH_VACUUM_CALC,
      handler: '~/server/middleware/shop-vacuum-calc.js',
    },
  ],
  watchers: {
    // Temporary fix: https://github.com/nuxt-community/tailwindcss-module/issues/359
    webpack: {
      ignored: ['**/.git/**'],
    },
  },
  render: {
    csp: {
      reportOnly: false,
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': ["'self'", 'data:', 'fonts.gstatic.com'], // TODO fonts.gstatic.com should be removed with PVWEB-982
        'img-src': ["'self'", 'https:', 'data:'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          '*.usercentrics.eu',
          '*.storyblok.com',
          'www.googletagmanager.com',
          'www.google-analytics.com',
          'api.privacyhub.pro',
        ],
        'connect-src': [
          "'self'",
          '*.usercentrics.eu',
          'region1.analytics.google.com', // google analytics
          '*.doubleclick.net', // google analytics
          'sso.pfeiffer-vacuum.com',
        ],
        'frame-src': [
          "'self'",
          'sso.pfeiffer-vacuum.com',
          'app.usercentrics.eu',
        ],
        'form-action': [
          process.env.DISABLE_SECURITY_POLICY_FORM_ACTION_SELF === 'true'
            ? '*'
            : "'self'",
        ], // disabled for OCI Checkout: PVWEB-904
        'object-src': ["'none'"],
        'base-uri': [baseURL],
        // TODO If we have sentry, we can add this:
        // 'report-uri': [
        // `https://sentry.io/api/<project>/security/?sentry_key=<key>`
        //]
      },
    },
  },
  helmet: {
    frameguard: false,
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/vacuumCalculator.config.js',
      vacuumCalculator: '~/apollo/vacuumCalculator.config.js',
    },
    watchLoading: '~/apollo/loadingHandler.js',
    errorHandler: '~/apollo/errorHandler.js',
    includeNodeModules: true,
  },
}
