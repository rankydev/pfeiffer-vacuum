<template>
  <!-- NOTE: we could use :key="slugs.slug" on CmsQuery to force CmsQuery to re-evaluate. this way we could get subpage meta page information (f.e. page title) -->
  <CmsQuery
    :handle-preview-events="true"
    :slug="slugs.slug"
    :fallback-slug="slugs.fallbackSlug"
    :language="slugs.language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data">
        <template #default>
          <ContentWrapper>
            <div class="myaccount-page">
              <MyAccountSidebar class="myaccount-page__sidebar" />

              <div class="myaccount-page__content">
                <NuxtChild />
              </div>

              <MyAccountManager class="myaccount-page__account-manager" />
            </div>
          </ContentWrapper>
        </template>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  defineComponent,
  useRoute,
  useContext,
  computed,
} from '@nuxtjs/composition-api'

import Page from '~/components/templates/Page/Page'
import MyAccountSidebar from '~/components/organisms/MyAccount/sidebar/MyAccountSidebar'
import MyAccountManager from '~/components/organisms/MyAccount/sidebar/MyAccountManager'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, CMS_PAGE } from '~/stores/page'

export default defineComponent({
  name: 'MyAccount',
  components: {
    Page,
    ContentWrapper,
    MyAccountSidebar,
    MyAccountManager,
  },
  middleware: 'my-account-guard',
  setup() {
    const route = useRoute()
    const context = useContext()

    const pageStore = usePageStore()
    pageStore.setPageType(CMS_PAGE)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    return {
      slugs,
    }
  },
})
</script>

<style lang="scss" scoped>
.myaccount-page {
  @apply tw-grid;
  grid-gap: 20px;
  grid-template:
    'nav'
    'content'
    'widget'
    / 100%;

  @screen lg {
    @apply tw-mt-10 tw-m-0;
    grid-template:
      'nav content'
      'widget content'
      'spacer content'
      / 20% auto;

    &__sidebar {
      grid-area: nav;
    }

    &__content {
      grid-area: content;
    }

    &__account-manager {
      grid-area: widget;
    }
  }
}
</style>
