<template>
  <!--
  <custom-cms-internationalization-query :handle-preview-events="true">
    <template #default="{ result: { data } }">
      <CmsRootComponent v-bind="data" />
    </template>
  </custom-cms-internationalization-query>
  -->
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <CmsRootComponent v-bind="data" />
    </template>
  </CmsQuery>
</template>

<script>
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'
import useInternationalizationUrlBuilder from '~/composables/useInternationalizationUrlBuilder'

export default defineComponent({
  layout: 'default',
  setup() {
    const route = useRoute()
    const { buildUrl } = useInternationalizationUrlBuilder()
    // regions = default, america(us), germany(de), korea(ko), china(zh)
    // languages = english(en), korean(ko), chinese(zh), german(de)

    // pfeiffer-vacuum.com/fluxkompensator -> pfeiffer-vacuum.com/de/de/home
    // pfeiffer-vacuum.com/de/de/
    // pfeiffer-vacuum.com/

    // http://localhost:3000/de/de-at/products
    // http://localhost:3000/de/en/products
    // http://localhost:3000/ko/en/products
    // http://localhost:3000/zh/en/products
    // http://localhost:3000/zh/en/products
    // http://localhost:3000/ru/en/products
    // http://localhost:3000/ru/de-de/products
    // http://localhost:3000/fluxkompensator/de-de/products
    // http://localhost:3000/ -> http://localhost:3000/default/en
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildUrl(currentPath.value)

    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>
