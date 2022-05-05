<template>
  <CmsPage />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { usePageStore, CMS_PAGE } from '~/stores/page'

export default defineComponent({
  layout: 'default',
  setup() {
    const pageStore = usePageStore()
    pageStore.setPageType(CMS_PAGE)
  },
})
</script>
