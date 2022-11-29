<template>
  <div class="generic-table">
    <div v-if="isMobile" class="generic-table__card-wrapper">
      <TableCard
        v-for="(row, i) in data"
        :key="`row${i}`"
        :data="row"
        v-bind="{ primary, secondary }"
      />
    </div>
    <template v-else>
      <TableView
        v-bind="{ header, data }"
        @sorting="$emit('sortingChanged', $event)"
      />
    </template>
  </div>
</template>
<script>
import { useContext } from '@nuxtjs/composition-api'
import TableView from './partials/TableView'
import TableCard from './partials/TableCard'

export default {
  components: { TableView, TableCard },
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    primary: {
      type: Object,
      default: () => ({
        position: 0,
        active: true,
      }),
    },
    secondary: {
      type: Object,
      default: () => ({
        position: 1,
        active: true,
      }),
    },
  },
  emits: ['sortingChanged'],
  setup() {
    const { app } = useContext()
    const { isMobile } = app.$breakpoints

    return { isMobile }
  },
}
</script>
<style lang="scss">
.generic-table {
  @apply tw-w-full;

  &__card-wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-y-6;
  }
}
</style>
