<template>
  <div>
    <MyAccountHeading />
    <div
      class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center"
      style="height: 800px"
    >
      <div>AddressData</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'

export default defineComponent({
  name: 'AddressData',
  components: {
    MyAccountHeading,
  },
})
</script>
