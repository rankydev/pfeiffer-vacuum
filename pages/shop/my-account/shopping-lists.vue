<template>
  <ShoppingListOverviewPage />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ShoppingListOverviewPage from '~/components/organisms/ShoppingListOverviewPage/ShoppingListOverviewPage.vue'
export default defineComponent({
  name: 'ShoppingLists',
  components: {
    ShoppingListOverviewPage,
  },
})
</script>
