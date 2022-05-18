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
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/style.scss'],

  router: {
    extendRoutes(routes) {
      for (const key in routes) {
        routes[key].caseSensitive = true
      }
    },
    middleware: 'internationalizationUrlBuilder',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/storyblok-api-client', mode: 'client' },
    { src: '~/plugins/breakpoints' },
    { src: '~/plugins/service.plugin', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/templates',
    '~/components/atoms',
    '~/components/molecules',
    '~/components/organisms',
    '~/components/util',
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
  modules: ['@txp-cms/storyblok', '@nuxt/image'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  // Storybook Configuration, see https://storybook.nuxtjs.org/options
  storybook: {
    port: 4000,
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
    defaultLanguage: process.env.DEFAULT_LANGUAGE_CODE,
    resolveRelations: process.env.STORYBLOK_RESOLVE_RELATIONS,
    resolveLinks: process.env.STORYBLOK_RESOLVE_LINKS,
    resolveAssets: process.env.STORYBLOK_RESOLVE_ASSETS,
    spaceId: process.env.STORYBLOK_SPACE_ID,
    contentTypes: process.env.STORYBLOK_CONTENT_TYPES,
    exclude:
      process.env.STORYBLOK_EXCLUDE_ROUTES &&
      process.env.STORYBLOK_EXCLUDE_ROUTES.split(','),
    regions: process.env.STORYBLOK_REGIONS,
    defaultRegion: process.env.STORYBLOK_DEFAULT_REGION,
    linksTransformer: './resolver/linksTransformer',
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://localhost:3000',
    languages: process.env.LANGUAGE_CODES.split(','),
  },

  server: {
    // for local change add 'environments/local.js'
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  },

  env: {
    // Environment variables for build-time

    // version info
    CI_COMMIT_REF_NAME: process.env.CI_COMMIT_REF_NAME,
    CI_COMMIT_SHORT_SHA: process.env.CI_COMMIT_SHORT_SHA,
    CI_PROJECT_URL: process.env.CI_PROJECT_URL,
    NODE_ENV: process.env.NODE_ENV,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
  },

  //nuxt-img configuration, see: https://image.nuxtjs.org/components/nuxt-img
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://img2.storyblok.com',
    },
  },
}
