<template>
  <div v-editable="content">
    <slot name="header">
      <div>
        <component
          :is="item.component"
          v-for="item in header"
          :key="item._uid"
          v-editable="hasCustomHeader && item"
          :content="item"
        />
      </div>
    </slot>

    <div>
      <slot>
        <component
          :is="item.component"
          v-for="item in content.body"
          :key="item._uid"
          v-editable="item"
          :content="item"
        />
      </slot>
    </div>

    <slot name="footer">
      <div>
        <component
          :is="item.component"
          v-for="item in footer"
          :key="item._uid"
          v-editable="hasCustomFooter && item"
          :content="item"
        />
      </div>
    </slot>
  </div>
</template>

<script lang="js">
import { defineComponent, toRefs, computed, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Page',
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root }) {
    const { $imageService, $config, $route } = root

    let { content } = toRefs(props)

    const pageTemplate = computed(() => {
      const template = content.value.template
      const isObject = typeof template === 'object' && template
      const hasContent = isObject && template.content

      return hasContent ? template.content : null
    })

    const hasCustomHeader = computed(() => {
      return content.value.header?.length > 0
    })

    const hasCustomFooter = computed(() => {
      return content.value.footer?.length > 0
    })

    const header = computed(() => {
      if (!hasCustomHeader && pageTemplate) {
        return pageTemplate.header
      }
      return content.value.header
    })

    const footer = computed(() => {
      if (!hasCustomFooter && pageTemplate) {
        return pageTemplate.footer
      }
      return content.value.footer
    })

    const meta = []
    const link = []

    const title = content.value.title
    const description = content.value.description
    meta.push({ hid: 'description', name: 'description', content: description })

    const baseUrl = $config.baseUrl

    addOpenGraph(meta, content.value, title, description, baseUrl, $imageService)
    addTwitter(meta, content.value, title, description, baseUrl, $imageService)

    addRobots(meta, content.value)

    const routeFullPath = $route.fullPath
    addCanonical(link, content.value, baseUrl, routeFullPath)

    useMeta(() => ({ title, meta, link }))

    return {hasCustomHeader, hasCustomFooter, header, footer}
  },
  head: {},
})

function getImageUrl (image, fallbackImageUrl, width, height, imageService) {
  return image && image.id ? 'https:' + imageService.getResponsiveImageUrl(image.filename, width, height, 'jpeg') : fallbackImageUrl
}

function addOpenGraph (meta, content, fallbackTitle, fallbackDescription, baseUrl, imageService) {
  const ogTitle = content.ogTitle
  const ogDescription = content.ogDescription
  const ogFallbackImage = baseUrl + '/open_graph_fallback_image.png'
  const ogImage = content.ogImage
  meta.push({ hid: 'og:title', name: 'og:title', content: ogTitle || fallbackTitle })
  meta.push({ hid: 'og:description', name: 'og:description', content: ogDescription || fallbackDescription })
  meta.push({ hid: 'og:image', name: 'og:image', content: getImageUrl(ogImage, ogFallbackImage, 1200, 630, imageService) })
}


function addTwitter (meta, content, fallbackTitle, fallbackDescription, baseUrl, imageService) {
  const twitterTitle = content.twitterTitle
  const twitterDescription = content.twitterDescription
  const twitterFallbackImage = baseUrl + '/twitter_fallback_image.png'
  const twitterImage = content.twitterImage
  meta.push({ hid: 'twitter:title', name: 'twitter:title', content: twitterTitle || fallbackTitle })
  meta.push({ hid: 'twitter:description', name: 'twitter:description', content: twitterDescription || fallbackDescription })
  meta.push({ hid: 'twitter:image', name: 'twitter:image', content: getImageUrl(twitterImage, twitterFallbackImage, 560, 300, imageService) })
}

function addRobots (meta, content) {
  const robotsContent = []
  if (content.noindex) {
    robotsContent.push('noindex')
  }
  if (content.nofollow) {
    robotsContent.push('nofollow')
  }

  if (robotsContent.length) {
    meta.push({ hid: 'robots', name: 'robots', content: robotsContent.join(',') })
  }
}

function addCanonical (link, content, baseUrl, routeFullPath) {
  const canonical = content.canonical || ''
  if (canonical === '' || canonical === '/') {
    link.push({ rel: 'canonical', href: baseUrl + routeFullPath })
    return
  }

  if (canonical.startsWith('/')) {
    link.push({ rel: 'canonical', href: baseUrl + canonical })
  } else {
    link.push({ rel: 'canonical', href: canonical })
  }
}
</script>
