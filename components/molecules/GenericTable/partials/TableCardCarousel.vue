<template>
  <div class="table-card-carousel">
    <GenericCarousel
      variant="tableCardCarousel"
      class="table-card-carousel__content"
    >
      <template #slides>
        <div
          v-if="recentTableDataEntries.length"
          v-for="(entry, index) in recentTableDataEntries"
          :key="getKey(index)"
          class="table-card-carousel__card"
        >
          <TableCard v-bind="{ primary, secondary, tableData: entry }" />
        </div>
      </template>
    </GenericCarousel>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import TableCard from '~/components/molecules/GenericTable/partials/TableCard'
import getKey from '~/composables/useUniqueKey'

export default defineComponent({
  name: 'TableCardCarousel',
  components: {
    GenericCarousel,
    ContentWrapper,
    TableCard,
  },
  props: {
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
  },
  setup(props) {
    /**
     * get last 3 entries from tableData
     */
    const recentTableDataEntries = computed(() =>
      props.tableData?.length ? props.tableData.slice(-3) : []
    )

    return { getKey, recentTableDataEntries }
  },
})
</script>
