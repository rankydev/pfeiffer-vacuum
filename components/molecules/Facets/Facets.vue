<template>
  <div class="facets">
    <div v-if="selectedFacets.length" class="facets__filter-tags">
      <span class="facets__filter-tags-label">
        {{ $t('category.activeFilters') }}
      </span>
      <FilterTag
        v-for="filter in selectedFacets"
        :key="filter.key + filter.value"
        class="facets__filter-tag-item"
        :filter="filter.displayName"
        :value="filter.value"
        @click="removeFacet(filter)"
      />
    </div>

    <FilterModal>
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
        <Popup v-if="vacuumRangePresent">
          <template #activator="{ togglePopup }">
            <Button
              :class="[
                'facets__slider-buttons',
                { 'facets__slider-buttons--active': vacuumRangeActive },
              ]"
              label="Vacuum Range"
              variant="secondary"
              shape="outlined"
              size="xsmall"
              icon="arrow_drop_down"
              @click="togglePopup"
            />
          </template>
          <div class="facets__vacuum-range-popup">
            <VacuumRangeSlider
              :initial-values="vaccuumRange"
              @update="updateFacets(null, $event, true)"
            />
          </div>
        </Popup>

        <Popup v-if="suctionSpeedPresent">
          <template #activator="{ togglePopup }">
            <Button
              :class="[
                'facets__slider-buttons',
                { 'facets__slider-buttons--active': suctionSpeedActive },
              ]"
              label="Suction Speed"
              variant="secondary"
              shape="outlined"
              size="xsmall"
              icon="arrow_drop_down"
              @click="togglePopup"
            />
          </template>
          <div class="facets__suction-speed-popup">
            <SuctionSpeedSelection
              @update="updateFacets(null, $event, false, true)"
            />
          </div>
        </Popup>

        <PvSelect
          v-for="facet in shrinkedFacets"
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
          v-if="multiSelectFacets.length > 2"
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
    </FilterModal>
  </div>
</template>

<script src="./Facets.js" />

<style lang="scss">
@import 'Facets';
</style>
