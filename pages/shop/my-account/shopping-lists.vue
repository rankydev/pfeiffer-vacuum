<template>
  <div>
    <div class="shopping-lists-account-header">
      <Button
        class="shopping-list-overlay__footer--forward"
        :label="
          isAddMode
            ? $t('myaccount.shoppingList.save')
            : $t('myaccount.shoppingList.add')
        "
        :icon="isAddMode ? 'save' : 'add'"
        shape="filled"
        variant="secondary"
        @click="handleForward"
      />
    </div>
    <ShoppingListTable :lists="shoppingLists" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useShoppingLists } from '@/stores/shoppinglists'
import ShoppingListTable from '~/components/molecules/ShoppingListTable/ShoppingListTable.vue'

export default defineComponent({
  name: 'ShoppingLists',
  components: {
    ShoppingListTable,
  },
  setup() {
    const { shoppingLists } = useShoppingLists()
    return { shoppingLists }
  },
})
</script>
