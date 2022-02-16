<template>
  <CustomCmsInternationalizationQuery :handle-preview-events="true">
    <template #default="{ result: { data } }">
      <CmsRootComponent v-bind="data" />
    </template>
  </CustomCmsInternationalizationQuery>
</template>

<script>
export default {
  layout: 'default',
}
</script>
