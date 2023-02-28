<template>
  <div v-if="lists.length" class="shopping-lists-table">
    <div class="shopping-lists-table__header">
      <span class="shopping-lists-table__header__title">
        {{ $t('myaccount.shoppinglist.title') }}
      </span>
      <span class="shopping-lists-table__header__last-edited">
        {{ $t('myaccount.shoppinglist.lastEdited') }}
      </span>
      <span class="shopping-lists-table__header__items">
        {{ $t('myaccount.shoppinglist.items') }}
      </span>
    </div>
    <ShoppingListItem
      v-for="list in lists"
      :key="list.id"
      class="shopping-lists-table__items"
      :list="list"
      :select-mode="selectMode"
    />
  </div>
</template>

<script>
import ShoppingListItem from '~/components/molecules?'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ShoppingListTable',
  components: {
    ShoppingListItem,
  },
  props: {
    lists: {
      type: Array,
      required: true,
    },
    selectMode: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // const deleteSelected = async () => {
    //   const buildRef = (id) => `shoppingListItem_${id}`
    //   const isSelected = (id) => this.$refs[buildRef(id)].isSelected()
    //
    //   const reducer = (memo, { id }) => (isSelected(id) ? [...memo, id] : memo)
    //   const idsToDelete = this.lists.reduce(reducer, [])
    //
    //   const { shoppingListApi } = this.$hybrisApi
    //   const deleteList = (id) => shoppingListApi.deleteShoppingList(id)
    //   const apiDeleteRequests = idsToDelete.map(deleteList)
    //
    //   await Promise.allSettled(apiDeleteRequests)
    // }

    return {}
  },
})
</script>
