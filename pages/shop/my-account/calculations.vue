<template>
  <div class="calculation-dashboard">
    <div class="calculation-dashboard__header">
      <ResultHeadline
        class="calculation-dashboard__header-headline"
        :headline="$t('myaccount.calculations.title')"
        :link="localePath('shop-my-account')"
      />

      <div class="calculation-dashboard__header-nav">
        <Button
          class="calculation-dashboard__header-nav--select"
          :icon="isSelectedListEmpty ? 'list' : 'close'"
          shape="outlined"
          gap="narrow"
          :label="
            isSelectedListEmpty
              ? $t('myaccount.select')
              : $t('myaccount.discard')
          "
          variant="secondary"
          @click="toggleSelectMode"
        />
        <Button
          class="calculation-dashboard__header-nav--new"
          :icon="isSelectedListEmpty ? 'add' : 'delete'"
          gap="narrow"
          :label="
            isSelectedListEmpty
              ? $t('myaccount.new')
              : $t('myaccount.calculations.delete')
          "
          variant="secondary"
          @click="deleteSelectedList"
        />
      </div>
    </div>

    <!-- 80/20 TODO: debug hydration issues -->
    <client-only>
      <CalculationList
        v-if="calculationItems"
        :lists="calculationItems"
        :select-mode="isSelectMode"
        @update="updateSelectedList"
        @delete="deleteSelectedList"
      />

      <Pagination
        v-if="calculations"
        class="calculation-dashboard__pagination"
        :total-pages="totalPages"
      />

      <EmptyWrapper
        :button="emptyWrapperButton"
        icon="calculate"
        :label="$t('myaccount.calculations.noCalculations')"
      />
    </client-only>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useContext,
  ref,
  onBeforeMount,
  onServerPrefetch,
  watch,
  useRoute,
} from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useToast } from '~/composables/useToast'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import calculationList from '~/apollo/queries/vacuumCalculator/calculationList.gql'
import deleteCalculation from '~/apollo/mutations/vacuumCalculator/deleteCalculation.gql'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import CalculationList from '~/components/organisms/CalculationList/CalculationList.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'

export default defineComponent({
  name: 'Calculations',
  components: {
    ResultHeadline,
    EmptyWrapper,
    CalculationList,
    Pagination,
  },
  setup() {
    const { i18n, app, $config } = useContext()
    const calculations = ref(null)
    const { logger } = useLogger()
    const vacuumCalculator = app.apolloProvider?.clients?.vacuumCalculator
    const ITEMS_PER_PAGE = 2
    const currentPage = ref(1)
    const route = useRoute()
    const totalItems = ref(0)
    const selectedList = ref([])
    const isSelectMode = ref(false)
    const toast = useToast()

    const fetchCalculations = async () => {
      try {
        calculations.value = await vacuumCalculator.query({
          query: calculationList,
          variables: {
            start: currentPage.value
              ? (currentPage.value - 1) * ITEMS_PER_PAGE
              : 0,
            limit: 2,
          },
        })
        totalItems.value = calculations.value?.data?.calculationList?.total
      } catch (error) {
        // TODO: check why toast is undefined
        // toast.error({
        //   description: i18n.t('myaccount.calculations.networkError'),
        // })
        logger.error(error)
      }
    }

    onBeforeMount(fetchCalculations)
    onServerPrefetch(fetchCalculations)

    const emptyWrapperButton = {
      size: 'normal',
      label: i18n.t('myaccount.calculations.new'),
      href: `${$config.VACUUM_CALCULATOR_BASE_URL}/${i18n.locale}`,
      shape: 'outlined',
      variant: 'secondary',
      target: '_blank',
      icon: 'add',
    }

    const isSelectedListEmpty = computed(() => {
      return selectedList.value.length === 0
    })

    const toggleSelectMode = () => {
      isSelectMode.value = !isSelectMode.value
      if (!isSelectMode.value) {
        clearSelectedLists()
      }
    }

    const clearSelectedLists = () => {
      selectedList.value = []
    }

    const calculationItems = computed(
      () => calculations.value?.data?.calculationList?.calculations || []
    )

    const totalPages = computed(() => {
      return Math.ceil(totalItems.value / ITEMS_PER_PAGE)
    })

    const setCurrentPage = () => {
      const queryPage = route.value?.query?.currentPage

      if (queryPage && queryPage <= totalPages.value) {
        currentPage.value = queryPage
      }
      if (queryPage && queryPage > totalPages.value) {
        currentPage.value = totalPages.value - 1
      }
    }

    watch(route, () => {
      setCurrentPage()
      fetchCalculations()
    })

    const updateSelectedList = (selectedItems) => {
      const selectedItemIds = selectedItems.map((item) => item.id)

      selectedList.value = selectedItemIds
    }

    const deleteSelectedList = async () => {
      try {
        await vacuumCalculator.mutate({
          mutation: deleteCalculation,
          variables: {
            ids: selectedList.value,
          },
        })
      } catch (error) {
        toast.error({
          description: i18n.t('myaccount.calculations.networkError'),
        })
        logger.error(error)
      }
    }

    return {
      emptyWrapperButton,
      calculationItems,
      totalPages,
      isSelectedListEmpty,
      toggleSelectMode,
      isSelectMode,
      updateSelectedList,
      deleteSelectedList,
      calculations,
    }
  },
})
</script>

<style lang="scss">
.calculation-dashboard {
  &__header {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-mb-4;

    @screen md {
      @apply tw-flex-row;
      @apply tw-items-start;
      @apply tw-mb-6;
    }

    @screen lg {
      @apply tw-mb-8;
    }

    &-headline {
      @screen md {
        @apply tw-my-auto;
      }
    }

    &-nav {
      @apply tw-flex;
      @apply tw-flex-col;

      @screen md {
        @apply tw-flex-row;
        @apply tw-ml-auto;
        @apply tw-my-auto;
      }

      &--select {
        @apply tw-hidden;
        @apply tw-min-w-fit;

        @screen md {
          @apply tw-flex;
          @apply tw-ml-auto;
          @apply tw-mr-2;
          @apply tw-w-[123px];
        }

        @screen lg {
          @apply tw-w-[86px];
        }
      }

      &--new {
        @apply tw-min-w-fit;

        @screen md {
          @apply tw-w-[123px];
        }

        @screen lg {
          @apply tw-w-[115px];
        }
      }
    }
  }

  &__pagination {
    @apply tw-mt-6;
    @apply tw-w-full;

    @screen md {
      @apply tw-mt-4;
      @apply tw-w-fit;
      @apply tw-m-auto;
    }

    .pagination__list {
      @apply tw-w-full;
    }

    .pagination__icon {
      @apply tw-h-12;
      @apply tw-w-12;

      @screen md {
        @apply tw-h-10;
        @apply tw-w-10;
      }
    }

    .pagination__counter {
      @apply tw-h-12;
      @apply tw-w-full;
    }
  }
}
</style>
