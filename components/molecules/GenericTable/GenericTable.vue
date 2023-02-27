<template>
  <div class="generic-table">
    <template v-if="carousel && isMobile">
      <TableCardCarousel v-bind="{ tableData, primary, secondary }" />
    </template>

    <div v-else-if="!carousel && isMobile" class="generic-table__card-wrapper">
      <TableCard
        v-for="(row, i) in tableData"
        :key="`row${i}`"
        :table-data="row"
        v-bind="{ primary, secondary }"
      />
    </div>

    <template v-else>
      <TableView v-bind="{ header, tableData }" />
    </template>
  </div>
</template>
<script>
import { useContext } from '@nuxtjs/composition-api'
import TableView from './partials/TableView'
import TableCard from './partials/TableCard'
import TableCardCarousel from './partials/TableCardCarousel'

export default {
  components: { TableView, TableCard, TableCardCarousel },
  props: {
    header: {
      type: Array,
      default: () => [],
    },
    tableData: {
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
    carousel: {
      type: Boolean,
      default: false,
    },
  },
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
