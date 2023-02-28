<template>
  <table class="table-view">
    <thead>
      <tr class="table-view__head">
        <th
          v-for="(entry, i) in header"
          :key="'head-' + i"
          :class="[
            'table-view__head-entry',
            {
              'table-view__head-entry--active': sorting.id === i,
              'table-view__head-entry--no-sort': !isSortable(entry),
            },
          ]"
          @click="isSortable(entry) ? changeSorting(i) : null"
        >
          <span v-if="entry.bold" class="table-view__head-entry--bold">{{
            entry.title
          }}</span>
          <span v-else>{{ entry.title }}</span>
          <Icon
            v-if="isSortable(entry)"
            class="table-view__sort-icon"
            :icon="`sort_${
              sorting.id === i ? sortingStates[sorting.state] : 'neutral'
            }`"
            type="svg"
            size="small"
          />
        </th>
        <th class="table-view__head-entry table-view__head-entry--no-sort"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in sortedData"
        :key="'row-' + i"
        class="table-view__row"
      >
        <td
          v-for="(cell, j) in row.entries"
          :key="`row${i}-${j}`"
          class="table-view__cell"
        >
          <Icon
            v-if="cell.icon"
            class="table-view__icon"
            :icon="cell.icon"
            variant="secondary"
            shape="outlined"
          />
          <span
            v-if="typeof cell === 'object' && cell.bold"
            class="table-view__cell table-view__cell--bold"
          >
            {{ cell.text }}
          </span>
          <span v-else>{{ typeof cell === 'object' ? cell.text : cell }}</span>
          <span v-if="cell.marginal" class="table-view__cell-marginal">
            {{ cell.marginal }}
          </span>
        </td>
        <td class="table-view__cell table-view__cell--action">
          <Button
            v-for="(btn, k) in row.actions.filter(
              (e) => !('desktop' in e) || e.desktop
            )"
            :key="`row${i}-action-${k}`"
            v-bind="btn"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import Button from '~/components/atoms/Button/Button'
import Icon from '~/components/atoms/Icon/Icon'
import { ref, toRefs, computed } from '@nuxtjs/composition-api'

export default {
  components: { Button, Icon },
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['sorting'],
  setup(props) {
    const sortingStates = ['neutral', 'asc', 'desc']
    const sorting = ref({ id: null, state: 0 })

    const { header, tableData } = toRefs(props)

    const changeSorting = (i) => {
      const next =
        i === sorting.value.id
          ? (sorting.value.state + 1) % sortingStates.length
          : 1
      sorting.value = { id: next > 0 ? i : null, state: next }
    }

    const sortedData = computed(() => {
      return tableData.value.slice().sort((a, b) => {
        if (sorting.value.id !== null) {
          switch (sortingStates[sorting.value.state]) {
            case 'neutral':
              return 0
            case 'asc':
              return header.value[sorting.value.id].sort(
                a.entries[sorting.value.id].text,
                b.entries[sorting.value.id].text
              )
            case 'desc':
              return header.value[sorting.value.id].sort(
                b.entries[sorting.value.id].text,
                a.entries[sorting.value.id].text
              )
          }
        }

        return 0
      })
    })

    const isSortable = (e) => !!e.sort

    return { sorting, sortingStates, changeSorting, isSortable, sortedData }
  },
}
</script>
<style lang="scss">
.table-view {
  @apply tw-w-full;
  @apply tw-text-left;

  &__sort-icon {
    @apply tw-inline-block;
    @apply tw-w-3;
    @apply tw-h-6;
  }

  &__head-entry {
    @apply tw-p-4;
    @apply tw-border-b-2 tw-border-pv-grey-80;
    @apply tw-text-base;
    @apply tw-text-pv-grey-32;
    @apply tw-text-sm;
    @apply tw-leading-6;
    @apply tw-font-normal;
    @apply tw-transition-all;
    @apply tw-whitespace-nowrap;

    @screen md {
      @apply tw-text-base;
    }

    &:not(&--no-sort):hover {
      @apply tw-font-bold;
      @apply tw-text-pv-red-lighter;
      @apply tw-border-pv-red;
      @apply tw-cursor-pointer;
    }

    &--active,
    &--bold {
      @apply tw-font-bold;
    }
  }

  &__row {
    @apply tw-bg-pv-white;

    &:nth-last-of-type(2n) {
      @apply tw-bg-pv-grey-96;
    }
  }

  &__cell {
    @apply tw-p-4;
    @apply tw-text-pv-grey-16;

    &-marginal {
      @apply tw-block;
      @apply tw-text-pv-grey-48;
      @apply tw-text-xs;
      @apply tw-leading-6;
    }

    &--action {
      @apply tw-flex;
      @apply tw-justify-end tw-items-center;
      @apply tw-gap-2;
      @apply tw-text-right;
    }

    &--bold {
      @apply tw-font-bold;
    }

    .icon__material.icon--base {
      @apply tw-align-bottom;
    }
  }
}
</style>
