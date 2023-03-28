<template>
  <Transition name="page">
    <CmsQuery
      :key="$i18n.locale"
      :handle-preview-events="false"
      :slug="slug"
      :language="$i18n.locale"
      :options="{ version }"
    >
      <template #default="{ result: { data, loading } }">
        <div>
          <LoadingSpinner :show="loading" container-min-height>
            <PageConfiguration
              v-if="data && data.content"
              :content="data.content"
            />
          </LoadingSpinner>
        </div>
      </template>
    </CmsQuery>
  </Transition>
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import PageConfiguration from '~/components/templates/PageConfiguration/PageConfiguration.vue'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'

export default defineComponent({
  components: {
    LoadingSpinner,
    PageConfiguration,
  },
  scrollToTop: true,
  setup() {
    // please note: Defining this here in default page template (used for root of all pages) means:
    // header / footer / stickybar is loaded once and will be same for all pages
    // Only variable parts are now in page.vue: stage / body
    const { $config } = useContext()
    const { CURRENT_REGION_CODE } = $config
    const slug = `/${CURRENT_REGION_CODE}/templates/defaultpageconfiguration`
    const { version } = useStoryblokVersion()

    return {
      slug,
      version,
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
    min-height: 70vh;
  }
}
</style>
