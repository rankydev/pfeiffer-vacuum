<template>
  <custom-cms-internationalization-query :handle-preview-events="true">
    <template #default="{ result: { data } }">
      <CmsRootComponent v-bind="data" />
    </template>
  </custom-cms-internationalization-query>
  <!--
  <CmsQuery
    :handle-preview-events="true"
    :slug="$route"
    :fallback-slug="createUrlPattern()"
  >
    <template #default="{ result: { data } }">
      <CmsRootComponent v-bind="data" />
    </template>
  </CmsQuery>
  -->
</template>

<script>
export default {
  layout: 'default',
}
</script>
