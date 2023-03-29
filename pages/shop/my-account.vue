<template>
  <ContentWrapper>
    <div class="myaccount-page">
      <MyAccountSidebar class="myaccount-page__sidebar" />

      <div class="myaccount-page__content">
        <Transition name="page">
          <!--
            Could add :key="slugs.slug" to force meta info refetch on onpage navigation
            For now not in use until we need this to save requests to backend and enable smooth page transitions
          -->
          <CmsQuery
            :handle-preview-events="true"
            :slug="slugs.slug"
            :fallback-slug="slugs.fallbackSlug"
            :language="slugs.language"
            :options="{ version }"
          >
            <template #default="{ result: { data, loading } }">
              <LoadingSpinner :show="loading" container-min-height>
                <Page v-if="data" v-bind="data" :min-height-page="false">
                  <template #default>
                    <NuxtChild />
                  </template>
                </Page>
              </LoadingSpinner>
            </template>
          </CmsQuery>
        </Transition>
      </div>
      <MyAccountManager class="myaccount-page__account-manager" />
    </div>
  </ContentWrapper>
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
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'

export default defineComponent({
  name: 'MyAccount',
  components: {
    Page,
    ContentWrapper,
    MyAccountSidebar,
    MyAccountManager,
    LoadingSpinner,
  },
  middleware: 'my-account-guard',
  setup() {
    const route = useRoute()
    const context = useContext()
    const { version } = useStoryblokVersion()

    const pageStore = usePageStore()
    pageStore.setPageType(CMS_PAGE)

    // When we are on a subpage of "address data" page we need to load the address data base page from storyblok
    // this is because our "_edit" subpage has a dynamic path with the address item id in it
    const addressDataBasePath = context.app.localePath(
      'shop-my-account-address-data'
    )
    const requestHistoryBasePath = context.app.localePath(
      'shop-my-account-request-history'
    )

    const path = computed(() => {
      let currentPath = route.value.path
      if (currentPath.startsWith(addressDataBasePath)) {
        currentPath = addressDataBasePath
      } else if (currentPath.startsWith(requestHistoryBasePath)) {
        currentPath = requestHistoryBasePath
      }
      return currentPath
    })

    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(path.value)
    })

    return {
      slugs,
      version,
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
      / 320px auto;

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
