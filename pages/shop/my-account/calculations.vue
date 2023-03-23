<template>
  <div class="calculation-dashboard">
    <ResultHeadline
      class="calculation-dashboard__headline"
      :headline="$t('myaccount.calculations.title')"
      :link="localePath('shop-my-account')"
    />

    <CalculationList
      v-if="calculationItemsByPage.length"
      :lists="calculationItemsByPage"
    />
    <Pagination
      v-if="calculationItemsByPage.length"
      class="shopping-list-overview-page__pagination"
      :total-pages="totalPages"
    />

    <EmptyWrapper
      v-else
      :button="emptyWrapperButton"
      icon="calculate"
      :label="$t('myaccount.calculations.noCalculations')"
    />
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
  onMounted,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import { useLogger } from '~/composables/useLogger'
import calculationList from '~/apollo/queries/vacuumCalculator/calculationList.gql'
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
    const router = useRouter()
    const route = useRoute()

    const fetchCalculations = async () => {
      try {
        calculations.value = await vacuumCalculator.query({
          query: calculationList,
          variables: {
            start: 0,
            limit: 8,
          },
        })
      } catch (error) {
        logger.error(error)
      }
    }

    onBeforeMount(fetchCalculations)
    onServerPrefetch(fetchCalculations)

    const emptyWrapperButton = {
      size: 'normal',
      label: i18n.t('myaccount.calculations.new'),
      href: `${process.env.VACUUM_CALCULATOR_BASE_URL}/${i18n.locale}`,
      shape: 'outlined',
      variant: 'secondary',
      target: '_blank',
      icon: 'add',
    }

    const calculationItems = computed(
      () => calculations.value?.data?.calculationList?.calculations || []
    )

    const totalPages = computed(() => {
      return Math.ceil(calculationItems.value.length / ITEMS_PER_PAGE)
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

    onMounted(() => {
      setCurrentPage()
    })

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
    }
  },
})
</script>
