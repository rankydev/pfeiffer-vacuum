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
  setup(props) {
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

    const title = content.value.title
    const description = content.value.description
    const meta = []
    meta.push({ hid: 'description', name: 'description', content: description })
    useMeta(() => ({ title, meta }))

    return {hasCustomHeader, hasCustomFooter, header, footer}
  },
  head: {},
})
</script>
