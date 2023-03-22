<template>
  <div>
    <MyAccountHeading />
    <div
      class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center"
      style="height: 800px"
    >
      <div>Calculations</div>
      <div v-if="calculations">{{ calculations }}</div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
import { useLogger } from '~/composables/useLogger'
import calculationList from '~/apollo/queries/vacuumCalculator/calculationList.gql'

export default defineComponent({
  name: 'Calculations',
  components: {
    MyAccountHeading,
  },
  setup() {
    const calculations = ref(null)
    const { app } = useContext()
    const { logger } = useLogger()
    const vacuumCalculator = app.apolloProvider?.clients?.vacuumCalculator

    const fetchCalculations = async () => {
      try {
        calculations.value = await vacuumCalculator.query({
          query: calculationList,
          variables: {
            // TODO in PVWEB-535: get pagination and page size selection values
            start: 0,
            limit: 9,
          },
        })
      } catch (error) {
        // TODO in PVWEB-535: show error message
        logger.error(error)
      }
    }

    onBeforeMount(fetchCalculations)
    onServerPrefetch(fetchCalculations)

    return { calculations }
  },
})
</script>
