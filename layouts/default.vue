<template>
  <Transition name="page">
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
  </Transition>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  scrollToTop: true,
  setup() {
    // please note: Defining this here in default page template (used for root of all pages) means:
    // header / footer / stickybar is loaded once and will be same for all pages
    // Only variable parts are now in page.vue: stage / body
    const slug = '/global/templates/defaultpageconfiguration'

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
    //  Navigating between pages without a min-height leed to an "empty" content area for a moment and then the footer is visible directly under the header
    min-height: 80vh;
  }
}
</style>
