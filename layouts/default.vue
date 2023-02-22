<template>
  <!-- TODO: Do we need a transition on language change? If yes, then we have to check why we always scroll down to the bottom with this transition -->
  <!-- Transition name="page" -->
  <div :key="$i18n.locale" class="default-layout">
    <CmsQuery
      :handle-preview-events="false"
      :slug="slug"
      :language="$i18n.locale"
    >
      <template #default="{ result: { data } }">
        <div>
          <div v-if="data && data.content" id="main-content">
            <slot name="header">
              <nuxt-dynamic
                v-for="item in data.content.top"
                :key="item._uid"
                v-editable="item"
                v-bind="item"
                :name="item.uiComponent || item.component"
              />

              <nuxt-dynamic
                v-for="item in data.content.header"
                :key="item._uid"
                v-bind="item"
                :name="item.uiComponent || item.component"
              />
            </slot>

            <slot name="onPageNavigation">
              <OnPageNavigation v-bind="(data.content.quicklinks || [])[0]" />
            </slot>

            <Nuxt class="default-layout__content" />

            <slot name="footer">
              <ContentWrapper>
                <nuxt-dynamic
                  v-for="item in data.content.bottom"
                  :key="item._uid"
                  v-editable="item"
                  v-bind="item"
                  :name="item.uiComponent || item.component"
                />
              </ContentWrapper>

              <nuxt-dynamic
                v-for="item in data.content.footer"
                :key="item._uid"
                v-bind="item"
                :name="item.uiComponent || item.component"
              />
            </slot>
            <StickyBar v-bind="data.content.stickyBar">
              <slot name="stickyBar" />
            </StickyBar>
          </div>
        </div>
      </template>
    </CmsQuery>
  </div>
  <!-- /Transition -->
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { usePageStore, CMS_PAGE } from '~/stores/page'

export default defineComponent({
  scrollToTop: true,
  setup() {
    const pageStore = usePageStore()

    // TODO Is this even correct here?
    pageStore.setPageType(CMS_PAGE)

    const slug = ref('/global/templates/defaultpageconfiguration')

    return {
      slug,
    }
  },
})
</script>
<style lang="scss">
@import 'globalColors';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.default-layout {
  &__content {
    // TODO:  Navigating between pages without a min-height leed to an "empty" content area for a moment and then the footer is visible directly under the header. Check if this is the best way to solve this problem.
    min-height: 80vh;
  }
}
</style>
