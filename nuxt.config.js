import { PATH_SHOP, PATH_SHOP_IMAGES } from './server/constants.js'
import {
  languageCodes,
  defaultLanguageCode,
  locales,
  dateTimeFormats,
} from './i18n.config'

const isStorybook = process.env.STORYBOOK

export default {
  srcDir: '',
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pvweb', // @todo make dynamic
    htmlAttrs: {
      lang: 'en-EN', // @todo make dynamic
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // @todo add link alternate href lang
    script: [
      {
        src: 'https://app.usercentrics.eu/browser-ui/latest/loader.js',
        id: 'usercentrics-cmp',
        'data-settings-id': process.env.USERCENTRICS_ID,
        'data-tcf-enabled': true,
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/style.scss'],

  ...(!isStorybook && {
    router: {
      base: `/${
        process.env.CURRENT_REGION_CODE || process.env.DEFAULT_REGION_CODE
      }/`,
      extendRoutes(routes) {
        // add root page to the routed object
        routes.push({
          name: 'Home',
          path: '/',
          component: '~/pages/_site/_.vue',
        })

        for (const key in routes) {
          routes[key].caseSensitive = true
        }
      },
    },
  }),

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/storyblok-api-client', mode: 'client' },
    { src: '~/plugins/breakpoints' },
    { src: '~/plugins/service.plugin', mode: 'client' },
    { src: '~/plugins/hybrisApi' },
    { src: '~/plugins/logger' },
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
    '@txp-cms/storyblok',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
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

  // SVG Sprite Configuration, see: https://github.com/nuxt-community/svg-sprite-module
  svgSprite: {
    input: '~/assets/svgSource',
    output: '~/assets/svgSprite',
  },

  // TXP-CMS Storyblok Configuration, see: https://txp-cms.dev/integrations/storyblok
  storyblok: {
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
  },

  server: {
    // for local change add 'environments/local.js'
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://localhost:3000',
    LANGUAGE_CODES: languageCodes,
    DEFAULT_LANGUAGE_CODE: defaultLanguageCode,
    REGION_CODES: (process.env.REGION_CODES || 'global').split(','),
    DEFAULT_REGION_CODE: process.env.DEFAULT_REGION_CODE || 'global',
    CURRENT_REGION_CODE: process.env.CURRENT_REGION_CODE || 'global',
    USERCENTRICS_PRIVACY_PATH: process.env.USERCENTRICS_PRIVACY_PATH,
  },

  env: {
    // version info
    CI_COMMIT_REF_NAME: process.env.CI_COMMIT_REF_NAME,
    CI_COMMIT_SHORT_SHA: process.env.CI_COMMIT_SHORT_SHA,
    CI_PROJECT_URL: process.env.CI_PROJECT_URL,
    NODE_ENV: process.env.NODE_ENV,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
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
      baseURL: 'https://img2.storyblok.com',
    },
  },
  // Will register file from project server/middleware directory to handle API calls
  serverMiddleware: [
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
  ],

  axios: {
    // See: https://axios.nuxtjs.org/options
    baseURL: process.env.SHOP_BASE_URL,
  },
}
