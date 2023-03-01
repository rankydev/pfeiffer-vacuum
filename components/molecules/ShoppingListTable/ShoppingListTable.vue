<template>
  <div v-if="lists.length" class="shopping-list-table">
    <div class="shopping-list-table__header">
      <span
        class="shopping-list-table__header__title"
        :class="{ 'shopping-list-table__header__title-active': selectMode }"
      >
        {{ $t('myaccount.shoppingList.title') }}
      </span>
      <span class="shopping-list-table__header__last-edited">
        {{ $t('myaccount.lastEdited') }}
      </span>
      <span class="shopping-list-table__header__items">
        {{ $t('myaccount.shoppingList.items') }}
      </span>
    </div>
    <ShoppingListItem
      v-for="list in lists"
      :key="list.id"
      class="shopping-list-table__items"
      :list="list"
      :select-mode="selectMode"
      @delete="deleteListItem"
      @update="updateDeleteList"
    />
  </div>
</template>

<script>
import ShoppingListItem from '~/components/molecules/ShoppingListItem/ShoppingListItem.vue'
import { defineComponent, ref } from '@nuxtjs/composition-api'

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
  emits: ['delete', 'update'],
  setup(props, { emit }) {
    const deleteList = ref([])

    const deleteListItem = (listItem) => {
      emit('delete', listItem)
    }

    const updateDeleteList = (listItem) => {
      if (listItem.selected) {
        deleteList.value.push(listItem.list)
      } else {
        deleteList.value = deleteList.value.filter(
          (list) => list?.id !== listItem.list?.id
        )
      }
      emit('update', deleteList.value)
    }

    return { deleteListItem, updateDeleteList }
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
      @apply tw-pb-4;
      @apply tw-border-b tw-border-b-pv-grey-88;
      @apply tw-text-pv-grey-32;
      @apply tw-text-sm;
      @apply tw-leading-6;
    }

    &__title {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-1 tw-col-end-4;
      @apply tw-ml-6;

      &-active {
        @screen md {
          @apply tw-mx-auto;
        }

        @screen lg {
          @apply tw-ml-3;
          @apply tw-mr-0;
        }
      }
    }

    &__last-edited {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-4 tw-col-end-6;
      @apply tw-ml-8;

      @screen lg {
        @apply tw-ml-6;
      }
    }

    &__items {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-6 tw-col-end-8;
      @apply tw-ml-7;

      @screen lg {
        @apply tw-ml-6;
      }
    }
  }

  &__items {
    @apply tw-mb-6;

    @screen md {
      @apply tw-mb-0;

      &:nth-child(odd) {
        @apply tw-bg-pv-white;
      }
    }
  }
}
</style>
