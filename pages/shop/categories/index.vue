<template>
  <SearchPage />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SearchPage from '~/components/templates/SearchPage/SearchPage'

export default defineComponent({
  components: {
    SearchPage,
  },
})
</script>
