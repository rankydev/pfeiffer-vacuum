<template>
  <div v-if="lists.length" class="shopping-list-table">
    <div class="shopping-list-table__header">
      <span
        class="shopping-list-table__header--title"
        :class="{ 'shopping-list-table__header--title-active': selectMode }"
      >
        {{ $t('myaccount.shoppingList.title') }}
      </span>
      <span class="shopping-list-table__header--last-edited">
        {{ $t('myaccount.lastEdited') }}
      </span>
      <span class="shopping-list-table__header--items">
        {{ $t('myaccount.shoppingList.items') }}
      </span>
    </div>
    <ShoppingListItem
      v-for="list in lists"
      :key="getUniqueId(list.id)"
      class="shopping-list-table__items"
      :list="list"
      :select-mode="selectMode"
      @delete="deleteListItem"
      @update="updateDeleteList"
      @details="details"
    />
  </div>
</template>

<script>
import ShoppingListItem from '~/components/molecules/ShoppingListItem/ShoppingListItem.vue'
import { defineComponent } from '@nuxtjs/composition-api'
import useUniqueKey from '~/composables/useUniqueKey'

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
  emits: ['delete', 'update', 'details'],
  setup(props, { emit }) {
    const getUniqueId = (id) => useUniqueKey('SHOPPING_LIST_TABLE_' + id)
    const deleteListItem = (listItem) => {
      emit('delete', listItem)
    }

    const updateDeleteList = (listItem) => {
      emit('update', listItem)
    }

    const details = (listItem) => {
      emit('details', listItem)
    }

    return { deleteListItem, updateDeleteList, getUniqueId, details }
  },
})
</script>
<style lang="scss">
.shopping-list-table {
  &__header {
    @apply tw-hidden;

    @screen md {
      @apply tw-grid;
      @apply tw-auto-rows-auto;
      @apply tw-grid-cols-12;
      @apply tw-py-4;
      @apply tw-border-b tw-border-b-2 tw-border-b-pv-grey-88;
      @apply tw-text-pv-grey-32;
      @apply tw-text-sm;
      @apply tw-leading-6;
    }

    @screen lg {
      @apply tw-text-base;
    }

    &--title {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-1 tw-col-end-7;
      @apply tw-ml-4;

      @screen lg {
        @apply tw-my-auto;
      }

      &-active {
        @screen md {
          @apply tw-col-start-2 tw-col-end-7;
          @apply tw-ml-8;
        }

        @screen lg {
          @apply tw-col-start-1 tw-col-end-7;
          @apply tw-ml-4;
        }
      }
    }

    &--last-edited {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-7 tw-col-end-9;
      @apply tw-ml-8;
    }

    &--items {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-9 tw-col-end-11;
      @apply tw-ml-8;
    }
  }

  &__items {
    @apply tw-mb-6;

    &:last-child {
      @apply tw-mb-0;
    }

    @screen md {
      @apply tw-mb-0;

      &:nth-child(odd) {
        @apply tw-bg-pv-white;
      }
    }
  }
}
</style>
