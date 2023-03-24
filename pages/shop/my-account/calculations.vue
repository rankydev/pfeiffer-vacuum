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

    <client-only>
      <CalculationList
        v-if="calculations"
        :lists="calculations.data.calculationList.calculations"
        :select-mode="isSelectMode"
        @update="updateSelectedList"
        @delete="deleteSelectedList"
      />

      <Pagination
        v-if="calculationItemsByPage.length"
        class="calculation-dashboard__pagination"
        :total-pages="totalPages"
      />

      <EmptyWrapper
        v-else
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
    const { i18n, app } = useContext()
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
            start: 0,
            limit: 8,
          },
        })
        totalItems.value = calculations.value?.data?.calculationList?.total
        console.log('totalitems', totalItems.value)
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

    const vacuumCalculatorLink = computed(
      () => `${process.env.VACUUM_CALCULATOR_BASE_URL}`
    )

    const emptyWrapperButton = {
      size: 'normal',
      label: i18n.t('myaccount.calculations.new'),
      href: process.env.VACUUM_CALCULATOR_BASE_URL,
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

    const calculationItemsByPage = computed(() => {
      return calculationItems.value.slice(
        (currentPage.value - 1) * ITEMS_PER_PAGE,
        currentPage.value * ITEMS_PER_PAGE
      )
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
    })

    const updateSelectedList = (selectedItems) => {
      selectedList.value = selectedItems
    }

    const deleteSelectedList = async () => {
      try {
        await vacuumCalculator.mutate({
          mutation: deleteCalculation,
          variables: {
            ids: ['cee8a83d-bce5-4cb4-a894-070b103d0094'],
          },
        })
      } catch (error) {
        logger.error(error)
      }
    }

    // const tableData = computed(() => {
    //   return (
    //     calculations.value?.data?.calculationList?.calculations.map((item) => {
    //       return {
    //         entries: [
    //           { icon: 'calculate', text: item.title, bold: true },
    //           i18n.d(new Date(item.insert), 'date'),
    //           i18n.t(`myaccount.calculations.modes.${item.calculationMode}`) ||
    //             '',
    //           i18n.t(`myaccount.calculations.types.${item.calculationType}`) ||
    //             '',
    //         ],
    //         actions: [
    //           {
    //             label: i18n.t('myaccount.calculations.detailPageLink'),
    //             icon: 'arrow_forward',
    //             variant: 'secondary',
    //             shape: 'plain',
    //             href: item.calculationResult.link,
    //             target: '_blank',
    //             mobile: false,
    //           },
    //           {
    //             icon: 'arrow_forward',
    //             variant: 'secondary',
    //             shape: 'outlined',
    //             href: item.calculationResult.link,
    //             label: i18n.t('myaccount.calculations.detailPageLink'),
    //             target: '_blank',
    //             desktop: false,
    //           },
    //           {
    //             icon: 'arrow_forward',
    //             variant: 'secondary',
    //             shape: 'outlined',
    //             href: item.calculationResult.link,
    //             label: i18n.t('myaccount.calculations.detailPageLink'),
    //             target: '_blank',
    //             desktop: false,
    //           },
    //         ],
    //       }
    //     }) || {}
    //   )
    // })

    return {
      emptyWrapperButton,
      calculationItems,
      totalPages,
      calculationItemsByPage,
      isSelectedListEmpty,
      toggleSelectMode,
      isSelectMode,
      vacuumCalculatorLink,
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
          @apply tw-w-[86px];
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
