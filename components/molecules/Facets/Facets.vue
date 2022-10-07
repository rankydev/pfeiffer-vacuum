<template>
  <div class="facets">
    <PvSelect
      :options="sorts"
      :value="sorts.find((e) => e.selected)"
      :clearable="false"
      option-label="name"
      :prepend-label="$t('category.sort')"
      icon-size="small"
      class="facets__multiselect"
      no-input
      @update="$emit('updateSort', $event)"
    />
    <PvSelect
      v-for="facet in multiSelectFacets"
      :key="facet.code"
      :value="facet.values.filter((e) => e.selected)"
      :placeholder="facet.name"
      :options="facet.values"
      option-label="name"
      icon-size="small"
      class="facets__multiselect"
      multiple
      no-input
      @update="updateFacets(facet.code, $event)"
    />
    <Button
      :label="
        isExtended ? $t('category.lessFilters') : $t('category.moreFilters')
      "
      variant="secondary"
      shape="outlined"
      icon="filter_list"
      gap="narrow"
      class="facets__expand-toggle"
      size="xsmall"
      @click="isExtended = !isExtended"
    />
  </div>
</template>
<script>
import { ref, computed } from '@nuxtjs/composition-api'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Button from '~/components/atoms/Button/Button'

export default {
  name: 'Facets',
  components: {
    PvSelect,
    Button,
  },
  props: {
    facets: {
      type: Array,
      required: true,
    },
    sorts: {
      type: Array,
      default: () => [],
    },
    currentQuery: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['updateSort', 'updateFacets'],
  setup(props, { emit }) {
    // Switch for showing less or more filters
    const isExtended = ref(false)
    // Filter given facets to only have type multiselect
    const multiSelectFacets = computed(() => {
      return (
        props.facets
          ?.filter(
            (e) => e.visible && !e.category && e.facetType === 'MULTISELECTOR'
          )
          .slice(0, isExtended.value ? undefined : 3) || []
      )
    })
    // Generate array with current selected facets from given currentQuery
    const selectedFacets = ref(
      props.currentQuery?.query?.filterTerms?.filter(
        (e) => e.key !== 'category'
      ) || []
    )

    // Add recent selected facet and values to current selection and emit
    const updateFacets = (code, e) => {
      emit('updateFacets', e)
      const newFacets = selectedFacets.value.filter((e) => e.key !== code)
      e.forEach((item) => {
        newFacets.push({ key: code, value: item.name })
      })
      emit('updateFacets', newFacets)
    }

    return { isExtended, multiSelectFacets, updateFacets }
  },
}
</script>
<style lang="scss">
.facets {
  @apply tw-flex;
  @apply tw-gap-2;
  @apply tw-flex-wrap;

  &__multiselect {
    @apply tw-inline-block;

    .vs__dropdown-toggle {
      @apply tw-p-2;
      font-size: 12px;
    }
  }

  &__expand-toggle {
    @apply tw-p-2;
  }
}
</style>
