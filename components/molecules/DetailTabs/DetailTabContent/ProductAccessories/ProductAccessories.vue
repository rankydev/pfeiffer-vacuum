<template>
  <div class="product-accessories">
    <div class="product-accessories__select-wrapper">
      <div class="product-accessories__select-fields--modal">
        <FilterModal
          class="product-accessories__modal"
          :label="$t('product.file.filter')"
        >
          <PvSelect
            :options="availableCategories"
            :value="selectedCategory"
            :disabled="!availableCategories.length"
            :clearable="false"
            :placeholder="$t('product.file.category')"
            class="product-accessories__category-filter"
            @input="categorySelected"
          />
          <PvSelect
            :options="availableTypes"
            :value="selectedType"
            :disabled="!selectedCategory || !availableTypes.length"
            :clearable="false"
            :placeholder="$t('product.type')"
            class="product-accessories__type-filter"
            @input="typeSelected"
          />
          <div
            v-if="selectedCategory"
            class="product-accessories__remove-filters"
            @click="resetFilter()"
          >
            <Icon icon="delete" />
            <span class="label">
              {{ $t('product.removeFilter') }}
            </span>
          </div>
        </FilterModal>
        <div
          v-if="selectedCategory || selectedType"
          class="product-accessories__filter-tags"
        >
          <FilterTag
            v-if="selectedCategory"
            :filter="$t('product.file.category')"
            :value="selectedCategory"
            @click="selectedCategory = null"
          />
          <FilterTag
            v-if="selectedType"
            :filter="$t('product.file.type')"
            :value="selectedType"
            @click="selectedType = null"
          />
        </div>
      </div>
      <div class="product-accessories__select-fields--desktop">
        <PvSelect
          :options="availableCategories"
          :value="selectedCategory"
          :disabled="!availableCategories.length"
          :clearable="false"
          :placeholder="$t('product.file.category')"
          class="product-accessories__category-filter"
          @input="categorySelected"
        />
        <PvSelect
          :options="availableTypes"
          :value="selectedType"
          :disabled="!selectedCategory || !availableTypes.length"
          :clearable="false"
          :placeholder="$t('product.type')"
          class="product-accessories__type-filter"
          @input="typeSelected"
        />
        <div
          v-if="selectedCategory"
          class="product-accessories__remove-filters"
          @click="resetFilter()"
        >
          <Icon icon="delete" />
          <span class="label">
            {{ $t('product.removeFilter') }}
          </span>
        </div>
      </div>
      <div class="product-accessories__search">
        <PvInput
          v-model="searchQuery"
          :placeholder="$t('product.searchInAccessories')"
          :icon="searchQuery ? 'close' : 'search'"
          autocomplete="off"
          @click:icon="searchBarIconClick"
        />
      </div>
    </div>
    <client-only>
      <div
        v-if="filteredAccessories.length"
        class="product-accessories__content"
      >
        <AccessoriesCardCarousel
          v-for="category in filteredAccessories"
          :key="category.name + selectedCategory + selectedType + searchQuery"
          :headline="category.name"
          :entries="referencesForCategory(category)"
          class="product-accessories__carousel-element"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import AccessoriesCardCarousel from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel'
import Icon from '~/components/atoms/Icon/Icon.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import { useProductStore } from '~/stores/product'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import FilterTag from '~/components/atoms/FilterTag/FilterTag'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'

export default {
  name: 'ProductAccessories',
  components: {
    AccessoriesCardCarousel,
    Icon,
    PvInput,
    PvSelect,
    FilterModal,
    FilterTag,
  },
  setup() {
    const searchQuery = ref('')
    const selectedCategory = ref(undefined)
    const selectedType = ref(undefined)
    const quantity = ref({})

    const productStore = useProductStore()
    const accessories = computed(() => {
      return productStore.accessoriesGroups || []
    })

    const filteredAccessories = computed(() => {
      const result = []

      for (const group of accessories.value) {
        if (
          (selectedCategory.value && selectedCategory.value === group.name) ||
          !selectedCategory.value
        ) {
          if (referencesForCategory(group).length > 0) {
            result.push(group)
          }
        }
      }

      return result
    })

    const availableCategories = computed(() => {
      const result = []

      for (const group of accessories.value) {
        if (group.name) {
          result.push(group.name)
        }
      }

      result.sort()

      return result
    })

    const availableTypes = computed(() => {
      const result = []

      for (const group of accessories.value) {
        if (group.name !== selectedCategory.value) {
          continue
        }

        if (group.groups) {
          for (const type of group.groups) {
            result.push(type.name)
          }
        }
      }

      result.sort()

      return result
    })

    const categorySelected = (category) => {
      selectedCategory.value = category

      if (selectedType.value) {
        selectedType.value = null
      }
    }

    const typeSelected = (type) => {
      selectedType.value = type
    }

    const resetFilter = () => {
      selectedCategory.value = undefined
      selectedType.value = undefined
    }

    const referencesForCategory = (category) => {
      const result = []
      let firstInType = true

      if (category.groups) {
        for (const type of category.groups) {
          firstInType = true

          if (selectedType.value && selectedType.value !== type.name) {
            continue
          }

          for (const reference of type.references) {
            if (searchQuery.value && searchQuery.value.length > 0) {
              if (targetMissmatchesFilters(reference, searchQuery)) {
                continue
              }
            }

            if (firstInType) {
              reference.type = type
              firstInType = false
            } else {
              reference.type = null
            }
            result.push(reference)

            quantity.value[reference.target.code] = 1
          }
        }
      }

      if (category.references) {
        for (const reference of category.references) {
          if (targetMissmatchesFilters(reference)) {
            continue
          }

          result.push(reference)

          quantity.value[reference.target.code] = 1
        }
      }

      return result
    }

    const targetMissmatchesFilters = (reference) => {
      return (
        !reference.target.name ||
        !reference.target.orderNumber ||
        (!reference.target.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) &&
          !reference.target.orderNumber
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()))
      )
    }

    const searchBarIconClick = () => {
      if (searchQuery.value) {
        searchQuery.value = ''
      }
    }

    return {
      searchQuery,
      selectedCategory,
      selectedType,
      quantity,
      filteredAccessories,
      availableCategories,
      availableTypes,
      resetFilter,
      referencesForCategory,
      categorySelected,
      typeSelected,
      searchBarIconClick,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-accessories {
  @apply tw-bg-pv-grey-96;
  @apply tw-w-full;

  &__modal {
    @apply tw-block;
    @screen md {
      @apply tw-hidden;
    }
  }

  &__select-wrapper {
    @apply tw-py-5;
    @apply tw-px-4;
    @apply tw-grid;
    @apply tw-grid-cols-12;
  }

  &__select-fields--modal {
    @apply tw-col-span-12;
    @apply tw-flex;
    @apply tw-flex-col;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__select-fields--desktop {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
      @apply tw-flex-row;
      @apply tw-col-span-8;
      @apply tw-pr-2;
    }
  }

  &__category-filter,
  &__type-filter {
    @apply tw-w-full;

    @screen md {
      @apply tw-mr-2;
      @apply tw-w-1/3;
      max-width: 33%;
    }
    @apply tw-pb-2;
  }

  &__remove-filters {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-pb-2;
    @apply tw-text-pv-red;
    @apply tw-cursor-pointer;

    .label {
      @apply tw-font-bold;
    }
  }

  &__filter-tags {
    @apply tw-mb-4;
  }

  &__search {
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-4;
    }
  }

  &__content {
    @apply tw-pb-8;
  }

  &__carousel-element {
    @apply tw-mt-5;
  }
}
</style>
