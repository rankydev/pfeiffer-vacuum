<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data">
        <template #default>
          <ContentWrapper>
            <section class="privacy">
              <script type="application/javascript">
                UC_UI_SUPPRESS_CMP_DISPLAY = true
              </script>
              <script
                :src="privacyScriptUrl(true)"
                type="text/javascript"
              ></script>
              <noscript>
                <iframe
                  :src="privacyScriptUrl(false)"
                  style="width: 100%; height: 100%; min-height: 600px"
                ></iframe>
              </noscript>
            </section>
          </ContentWrapper>
        </template>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  defineComponent,
  ref,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api'

import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

export default defineComponent({
  name: 'PrivacyPage',
  components: {
    Page,
    ContentWrapper,
  },
  layout: 'default',
  setup: function () {
    const route = useRoute()
    const context = useContext()

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildSlugs(currentPath.value)

    /**
     * build the privacy script url
     */
    const privacyScriptUrl = (script) => {
      const rootPathUrl = context.$config.USERCENTRICS_PRIVACY_PATH
      return `${rootPathUrl}&lang=${language}&script=${script}`
    }

    return {
      slug,
      fallbackSlug,
      language,
      privacyScriptUrl,
    }
  },
})
</script>

<style lang="scss">
.privacy {
  padding-top: 20px;
}
</style>
