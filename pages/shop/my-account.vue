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
  ref,
  useRoute,
  useRouter,
  useContext,
  onBeforeMount,
} from '@nuxtjs/composition-api'

import Page from '~/components/templates/Page/Page'
import MyAccountSidebar from '~/components/organisms/MyAccount/sidebar/MyAccountSidebar'
import MyAccountManager from '~/components/organisms/MyAccount/sidebar/MyAccountManager'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

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
    const router = useRouter()
    const route = useRoute()
    const context = useContext()
    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildSlugs(currentPath.value)

    // This is required for initial page load.
    // Doing the check in the middleware (on SSR) is not possible because SSR does not have the information if user is logged in
    // when navigating onpage "my-account-guard" middleware will protect the route
    onBeforeMount(() => {
      if (!isLoggedIn.value) {
        router.replace({
          path: context.app.localePath('/'),
        })
      }
    })

    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>

<style lang="scss" scoped>
.myaccount-page {
  display: grid;
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
