<template>
  <div>
    <MyAccountHeading />
    <div
      class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center"
      style="height: 800px"
    >
      <div>Calculations</div>
      <div v-if="calculationList">{{ calculationList }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
import calculationList from '~/apollo/queries/vacuumCalculator/calculationList.gql'

export default defineComponent({
  name: 'Calculations',
  components: {
    MyAccountHeading,
  },
  apollo: {
    calculationList: {
      query: calculationList,
      client: 'vacuumCalculator',
      prefetch: true,
      variables() {
        return {
          // TODO in PVWEB-535: get pagination and page size selection values
          start: 0,
          limit: 9,
        }
      },
      error(e) {
        // TODO in PVWEB-535: show error message
        console.error(e)
      },
    },
  },
})
</script>
