<template>
  <div>
    <!-- <nuxt-dynamic
      v-for="item in data.content.top"
      :key="item._uid"
      v-editable="item"
      v-bind="item"
      :name="item.uiComponent || item.component"
    /> -->

    <nuxt-dynamic
      v-for="item in content.header"
      :key="item._uid"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />

    <Nuxt class="default-layout__content" />

    <nuxt-dynamic
      v-for="item in content.footer"
      :key="item._uid"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, toRefs } from '@nuxtjs/composition-api'
import { usePageStore } from '~/stores/page'

export default defineComponent({
  name: 'PageConfiguration',
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  setup(props) {
    const { content } = toRefs(props)
    const pageStore = usePageStore()

    onMounted(() => {
      pageStore.setPageConfigurationContent(content.value)
    })
  },
})
</script>
