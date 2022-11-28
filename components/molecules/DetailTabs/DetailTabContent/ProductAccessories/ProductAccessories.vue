<template>
  <div class="accessories">
    <div class="filters tw-grid tw-grid-cols-12">
      <div class="tw-col-span-12 md:tw-col-span-8 md:tw-pr-2">
        <div
          v-if="selectedCategory"
          class="remove-filters"
          @click="resetFilter()"
        >
          <Icon icon="delete" />
          <span class="label">
            {{ $t('product.removeFilter') }}
          </span>
        </div>
      </div>
      <div class="tw-col-span-12 md:tw-col-span-4">
        <PvInput
          v-model="searchQuery"
          :placeholder="$t('product.searchInAccessories')"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="items">
      <div
        v-for="(category, index) in filteredAccessories"
        :key="index"
        class="category"
      >
        <h5>
          {{ category.name }}
        </h5>
        <div>
          <AccessoriesCardCarousel :entries="referencesForCategory(category)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { computed, ref } from '@nuxtjs/composition-api'
import AccessoriesCardCarousel from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel'
import Icon from '~/components/atoms/Icon/Icon.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import { useProductStore } from '~/stores/product'

export default {
  name: 'ProductAccessories',
  components: {
    AccessoriesCardCarousel,
    Icon,
    PvInput,
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

    // const categorySelected = (category) => {
    //   selectedCategory.value = category

    //   if (selectedType.value) {
    //     selectedType.value = null
    //   }
    // }

    // const typeSelected = (type) => {
    //   selectedType.value = type
    // }

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
              if (
                !reference.target.name
                  .toLowerCase()
                  .includes(searchQuery.value.toLowerCase()) &&
                !reference.target.orderNumber
                  .toLowerCase()
                  .includes(searchQuery.value.toLowerCase())
              ) {
                continue
              }
            }

            if (firstInType) {
              reference.type = type
              firstInType = false
            }
            result.push(reference)

            quantity.value[reference.target.code] = 1
          }
        }
      }

      if (category.references) {
        for (const reference of category.references) {
          if (
            !reference.target.name
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) &&
            !reference.target.orderNumber.includes(
              searchQuery.value.toLowerCase()
            )
          ) {
            continue
          }

          result.push(reference)

          quantity.value[reference.target.code] = 1
        }
      }

      return result
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
    }
  },
  // computed: {
  //   ...mapGetters(['currentUser']),
  // },
}
</script>

<style lang="scss" scoped>
.accessories {
  @apply tw-bg-pv-grey-96;

  .filters {
    padding: 20px 16px;

    .input-group {
      position: relative;
      padding-bottom: 8px;

      @screen md {
        max-width: 300px;
        float: right;
      }

      .input-group-append {
        position: absolute;
        top: 12px;
        right: 8px;
        z-index: 3;

        @screen md {
          top: 8px;
        }

        .material-icons {
          font-size: 24px;
          cursor: pointer;

          @screen md {
            font-size: 32px;
          }
        }
      }
    }

    .category-filter,
    .type-filter {
      width: 100%;

      @screen md {
        width: 33%;
        max-width: 33%;
      }
      padding-bottom: 8px;
    }

    .remove-filters {
      display: inline-block;
      @apply tw-text-pv-red;
      cursor: pointer;

      .label {
        font-weight: bold;
      }
    }
  }

  .items {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 32px;
  }
}
</style>

<style lang="scss">
.category-filter,
.type-filter {
  button {
    &.selected-dropdown {
      @apply tw-text-pv-black;
    }

    @screen md {
      overflow: hidden;
      width: 100%;
    }
  }
}

.reference-type-popover {
  @apply tw-bg-pv-white;

  // TODO:
  // border: 1px solid $pv-grey-80;
  padding: 4px 8px;
  width: auto;

  .popover-body {
    @apply tw-text-pv-black;
  }
}
</style>
