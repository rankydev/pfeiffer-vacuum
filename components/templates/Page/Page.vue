<template>
  <div class="page-template">
    <slot name="header">
      <nuxt-dynamic
        v-for="item in top"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <nuxt-dynamic
        v-for="item in header"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>

    <slot name="onPageNavigation">
      <OnPageNavigation v-bind="(content.quicklinks || [])[0]" />
    </slot>
    <slot>
      <main>
        <nuxt-dynamic
          v-for="item in stage"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
        <ContentWrapper>
          <nuxt-dynamic
            v-for="item in body"
            :key="item._uid"
            v-editable="item"
            v-bind="item"
            :name="item.uiComponent || item.component"
          />
        </ContentWrapper>
      </main>
    </slot>

    <slot name="footer">
      <ContentWrapper>
        <nuxt-dynamic
          v-for="item in bottom"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </ContentWrapper>

      <nuxt-dynamic
        v-for="item in footer"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>
    <StickyBar v-bind="stickyBar">
      <slot name="stickyBar" />
    </StickyBar>
  </div>
</template>

<script>
import { defineComponent, inject, toRefs } from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import useTemplating from '~/composables/useTemplating'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation.vue'
import StickyBar from '~/components/atoms/StickyBar/StickyBar.vue'
import { useMyAccountStore } from '~/stores/myaccount'

export default defineComponent({
  name: 'Page',
  components: {
    ContentWrapper,
    OnPageNavigation,
    StickyBar,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
    metaData: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs', () => [])()
    const defaultFullSlug = inject('getDefaultFullSlug', () => '')()
    const { top, header, stage, body, bottom, footer, stickyBar } =
      useTemplating(content)
    const { getMetaData } = useMeta(
      props.metaData || content.value,
      defaultFullSlug,
      translatedSlugs
    )

    const myAccountStore = useMyAccountStore()
    myAccountStore.hydrateMenuItems(header)

    return {
      top,
      header,
      stage,
      body,
      bottom,
      footer,
      stickyBar,
      head: getMetaData(),
    }
  },
  head() {
    return this.head
  },
})
</script>

<style lang="scss">
.page-template {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-min-h-screen;
  @apply tw-overflow-x-hidden;
}
</style>
