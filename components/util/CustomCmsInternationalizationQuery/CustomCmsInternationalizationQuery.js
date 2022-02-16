export default {
  name: 'CustomCmsInternationalizationQuery',
  props: {
    slug: {
      type: String,
      default: undefined,
    },
    language: {
      type: String,
      default: undefined,
    },
    region: {
      type: String,
      default: undefined,
    },
    merge: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    update: {
      type: Function,
      default: (data) => data,
    },
    tag: {
      type: String,
      default: 'div',
    },
    handlePreviewEvents: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      result: {
        data: null,
        loading: false,
        error: null,
      },
    }
  },
  computed: {
    cmsOptions() {
      return {
        resolve_relations: this.$cms.relationsToResolve,
        resolve_links: this.$cms.resolveLinks,
        resolve_assets: this.$cms.resolveAssets,
        ...this.options,
      }
    },
  },
  mounted() {
    if (!this.handlePreviewEvents) {
      return
    }

    this.$cmsbridge.onChange(this.cmsOptions.resolve_relations, (data) => {
      if (data.story.id === this.result.data.id) {
        const content = Object.assign(
          {},
          this.result.data.content,
          data.story.content
        )
        this.result.data.content = this.$cms.resolveContent(content)
      }
    })
  },
  async fetch() {
    try {
      this.result.loading = true
      // Route is cut at the wrong route section here (getSlugFromRoute() | node_modules/@txp-cms/storyblok/src/templates/storyblok.plugin.js)
      // e.g. /de/en/home will be cut to /en/home
      // region will be fetched from the wrong cut slug (see line 94)
      const slugFromRoute = await this.$cms.getSlugFromRoute({
        route: this.$route,
      })
      console.log('slugFromRoute')
      console.log(slugFromRoute)
      const slug = this.slug || slugFromRoute
      const language =
        this.language ||
        // Language will be get from wrong route section here (getLanguageFromRoute() | node_modules/@txp-cms/storyblok/src/templates/storyblok.plugin.js)
        (await this.$cms.getLanguageFromRoute({
          route: this.$route,
        })) ||
        this.$cms.defaultLanguageCode

      const region = this.region || this.getRegionFromSlug(slugFromRoute)
      let slugWithoutRegion = slug.replace(new RegExp('^\\/' + region), '')

      let bySlugs = null
      if (region === this.$cms.defaultRegion) {
        bySlugs = `${region}${slugWithoutRegion}`
      } else {
        bySlugs = `${this.$cms.defaultRegion}${slugWithoutRegion},${region}${slugWithoutRegion}`
      }

      const response = await this.$cms.query({
        slug: '',
        options: {
          by_slugs: bySlugs,
          language,
          ...this.cmsOptions,
        },
      })

      if (response.error) {
        throw response.error
      }

      let data = null
      if (this.merge) {
        data = response.data
      } else {
        const alternativeStory = response.data.find((story) => {
          const regionOfCurrentStory = this.getRegionFromSlug(
            story.full_slug,
            1
          )
          return regionOfCurrentStory === region
        })

        data = alternativeStory || response.data[0]
      }

      this.result = {
        loading: false,
        data: this.update(data),
      }
    } catch (error) {
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }

      this.$nuxt.error({ statusCode: 404, message: error && error.message })
    }
  },
  render(h) {
    let result = this.$scopedSlots.default({
      result: this.result,
      error: this.result && this.result.error,
    })
    if (Array.isArray(result)) {
      result = result.concat(this.$slots.default)
    } else {
      result = [result].concat(this.$slots.default)
    }
    return this.tag ? h(this.tag, result) : result[0]
  },
  methods: {
    getRegionFromSlug(slug, index = 0) {
      const pathSegments = slug.split('/').filter(String)
      const pathSegment = pathSegments[index]

      if (this.$cms.regions.split(',').includes(pathSegment)) {
        return pathSegment
      } else {
        return this.$cms.defaultRegion
      }
    },
    cleanupSlug(slug) {
      return slug.replace(/^\/+|\/+$/g, '')
    },
  },
}
