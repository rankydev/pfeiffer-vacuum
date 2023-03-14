<template>
  <ShoppingListDetailPage />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ShoppingListOverviewPage from '~/components/organisms/ShoppingListOverviewPage/ShoppingListOverviewPage.vue'
import ShoppingListDetailPage from '~/components/organisms/ShoppingListDetailPage/ShoppingListDetailPage.vue'
export default defineComponent({
  name: 'ShoppingLists',
  components: {
    //ShoppingListOverviewPage,
    ShoppingListDetailPage,
  },
})
</script>
