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

    <FilterModal :label="$t('category.sortAndFilter')">
      <div class="facets__selects">
        <PvSelect
          :options="sorts"
          :value="sorts.find((e) => e.selected)"
          :clearable="false"
          option-label="name"
          :prepend-label="$t('category.sort')"
          icon-size="small"
          :class="['facets__multiselect', 'facets__multiselect--name']"
          no-input
          @input="$emit('updateSort', $event)"
        />
        <Popup v-if="isVacuumRangePresent">
          <template #activator="{ togglePopup }">
            <InternalBtnWrapper
              class="facets__slider-buttons"
              :active="isVacuumRangeActive"
              :label="$t('category.vacuumRange')"
              variant="secondary"
              shape="outlined"
              size="xsmall"
              icon="arrow_drop_down"
              @click="togglePopup"
            />
          </template>
          <div class="facets__vacuum-range-popup">
            <VacuumRangeSlider
              :initial-values="vacuumRange"
              @update="updateFacets(null, $event, true)"
            />
          </div>
        </Popup>

        <Popup v-if="isSuctionSpeedPresent">
          <template #activator="{ togglePopup }">
            <InternalBtnWrapper
              class="facets__slider-buttons"
              :active="isSuctionSpeedActive"
              :label="$t('category.suctionSpeed')"
              variant="secondary"
              shape="outlined"
              size="xsmall"
              icon="arrow_drop_down"
              @click="togglePopup"
            />
          </template>
          <div class="facets__suction-speed-popup">
            <SuctionSpeedSelection
              :value="suctionSpeed"
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
          @input="updateFacets(facet.code, $event)"
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
<script src="./Facets.script.js" />
<style lang="scss">
@import 'Facets';
</style>
