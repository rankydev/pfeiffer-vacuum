<template>
  <div class="facets">
    <div>
      <VacuumRangeSlider
        style="margin-bottom: 32px"
        @update="updateFacets(null, $event, true)"
      />
      <SuctionSpeedSelection
        style="margin-bottom: 32px"
        @update="updateFacets(null, $event, false, true)"
      />
    </div>
    <div v-if="activeFilters.length" class="facets__filter-tags">
      <span class="facets__filter-tags-label">
        {{ $t('category.activeFilters') }}
      </span>
      <FilterTag
        v-for="filter in activeFilters"
        :key="filter.key + filter.value"
        :filter="filter.displayName"
        :value="filter.value"
        @click="removeFacet(filter)"
      />
    </div>
    <div class="facets__selects">
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
  </div>
</template>
<script src="./Facets.js" />
<style lang="scss">
.facets {
  &__selects {
    @apply tw-flex;
    @apply tw-gap-2;
    @apply tw-flex-wrap;
  }

  &__multiselect {
    @apply tw-inline-block;

    .vs__dropdown-toggle {
      @apply tw-p-2;
      @apply tw-text-xs;
    }
  }

  &__expand-toggle {
    @apply tw-p-2;
  }

  &__filter-tags {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-gap-2;
    @apply tw-mb-4;

    &-label {
      @apply tw-font-bold;
    }
  }
}
</style>
