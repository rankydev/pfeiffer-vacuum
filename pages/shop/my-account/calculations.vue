<template>
  <div class="calculation-dashboard">
    <ResultHeadline
      class="calculation-dashboard__headline"
      :headline="$t('myaccount.calculations.title')"
      :link="localePath('shop-my-account')"
    />

    <CalculationList v-if="calculationItems.length" :lists="calculationItems" />

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
  watch,
  defineComponent,
  useContext,
  ref,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import calculationList from '~/apollo/queries/vacuumCalculator/calculationList.gql'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import CalculationList from '~/components/organisms/CalculationList/CalculationList.vue'

export default defineComponent({
  name: 'Calculations',
  components: {
    ResultHeadline,
    EmptyWrapper,
    CalculationList,
  },
  setup() {
    const { i18n, app } = useContext()
    const calculations = ref(null)
    const vacuumCalculator = app.apolloProvider?.clients?.vacuumCalculator

    const fetchCalculations = async () => {
      try {
        calculations.value = await vacuumCalculator.query({
          query: calculationList,
          variables: {
            start: 0,
            limit: 9,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }

    onBeforeMount(fetchCalculations)
    onServerPrefetch(fetchCalculations)

    const emptyWrapperButton = {
      size: 'normal',
      label: i18n.t('myaccount.calculations.new'),
      href: 'https://testing-vacuum-calculator.pfeiffer-vacuum.com/de/#/',
      shape: 'outlined',
      variant: 'secondary',
      target: '_blank',
      icon: 'add',
    }

    const tableHeader = [
      { title: i18n.t('myaccount.calculations.name'), sortable: true },
      { title: i18n.t('myaccount.calculations.date'), sortable: true },
      { title: i18n.t('myaccount.calculations.mode'), sortable: true },
      { title: i18n.t('myaccount.calculations.type'), sortable: true },
    ]

    const calculationItems = computed(
      () => calculations.value?.data?.calculationList?.calculations || []
    )

    const tableData = computed(() => {
      return (
        calculations.value?.data?.calculationList?.calculations.map((item) => {
          return {
            entries: [
              { icon: 'calculate', text: item.title, bold: true },
              i18n.d(new Date(item.insert), 'date'),
              i18n.t(`myaccount.calculations.modes.${item.calculationMode}`) ||
                '',
              i18n.t(`myaccount.calculations.types.${item.calculationType}`) ||
                '',
            ],
            actions: [
              {
                label: i18n.t('myaccount.calculations.detailPageLink'),
                icon: 'arrow_forward',
                variant: 'secondary',
                shape: 'plain',
                href: item.calculationResult.link,
                target: '_blank',
                mobile: false,
              },
              {
                icon: 'arrow_forward',
                variant: 'secondary',
                shape: 'outlined',
                href: item.calculationResult.link,
                label: i18n.t('myaccount.calculations.detailPageLink'),
                target: '_blank',
                desktop: false,
              },
              {
                icon: 'arrow_forward',
                variant: 'secondary',
                shape: 'outlined',
                href: item.calculationResult.link,
                label: i18n.t('myaccount.calculations.detailPageLink'),
                target: '_blank',
                desktop: false,
              },
            ],
          }
        }) || {}
      )
    })

    return { emptyWrapperButton, tableHeader, tableData, calculationItems }
  },
})
</script>
