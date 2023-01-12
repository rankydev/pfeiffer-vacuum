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
  useContext,
} from '@nuxtjs/composition-api'

import Page from '~/components/templates/Page/Page'
import MyAccountSidebar from '~/components/organisms/MyAccount/sidebar/MyAccountSidebar'
import MyAccountManager from '~/components/organisms/MyAccount/sidebar/MyAccountManager'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

export default defineComponent({
  name: 'MyAccount',
  components: {
    Page,
    ContentWrapper,
    MyAccountSidebar,
    MyAccountManager,
  },
  setup() {
    const route = useRoute()
    const context = useContext()

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildSlugs(currentPath.value)

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
