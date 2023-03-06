<template>
  <GenericSidebar :is-open="open" position="right" @closeSidebar="closeOverlay">
    {{ currentShoppingLists }}
    <ShoppingListTable :lists="currentShoppingLists" />
  </GenericSidebar>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import GenericSidebar from '@/components/molecules/GenericSidebar/GenericSidebar.vue'
import ShoppingListTable from '@/components/molecules/ShoppingListTable/ShoppingListTable.vue'
import { useShoppingLists } from '@/stores/shoppinglist'

export default defineComponent({
  name: 'CartOverlay',
  components: {
    GenericSidebar,
    ShoppingListTable,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const open = ref(props.isOpen)
    const closeOverlay = () => {
      open.value = false
    }

    const { currentShoppingLists } = useShoppingLists()

    return {
      closeOverlay,
      currentShoppingLists,
      open,
    }
  },
})
</script>

<style scoped></style>
