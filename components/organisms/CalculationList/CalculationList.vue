<template>
  <div class="calculation-list-table">
    <div class="calculation-list-table__header">
      <span
        class="calculation-list-table__header--title"
        :class="{ 'calculation-list-table__header--title-active': selectMode }"
      >
        {{ $t('myaccount.calculations.name') }}
      </span>
      <span class="calculation-list-table__header--date">
        {{ $t('myaccount.calculations.date') }}
      </span>
      <span class="calculation-list-table__header--calculation-mode">
        {{ $t('myaccount.calculations.mode') }}
      </span>
      <span class="calculation-list-table__header--calculation-type">
        {{ $t('myaccount.calculations.type') }}
      </span>
    </div>
    <CalculationListItem
      v-for="item in lists"
      :key="item.id"
      class="calculation-list-table__item"
      :item="item"
      :select-mode="selectMode"
      @delete="deleteListItem"
      @update="updateDeleteList"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import CalculationListItem from '@/components/molecules/CalculationListItem/CalculationListItem'

export default defineComponent({
  name: 'CalculationList',
  components: {
    CalculationListItem,
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
.calculation-list-table {
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
      @apply tw-col-start-1 tw-col-end-4;
      @apply tw-ml-4;

      @screen lg {
        @apply tw-my-auto;
      }

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

    &--date {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-4 tw-col-end-5;
      @apply tw-ml-8;
    }

    &--calculation-mode {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-6 tw-col-end-9;
      @apply tw-ml-8;

      @screen lg {
        @apply tw-ml-6;
      }
    }

    &--calculation-type {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-9 tw-col-end-11;
      @apply tw-ml-4;

      @screen lg {
        @apply tw-ml-6;
      }
    }
  }

  &__item {
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
