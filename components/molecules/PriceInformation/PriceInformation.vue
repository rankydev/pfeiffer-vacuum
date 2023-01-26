<template>
  <div>
    <ContentCTABox
      v-if="!hiddenUIElements.checkoutInformationSpecificPrices"
      :headline="$t('cart.priceInformationHeadline')"
      :description="[
        { component: 'Richtext', richtext: $t('cart.priceInformation1') },
        { component: 'Richtext', richtext: $t('cart.priceInformation2') },
      ]"
    />
    <div
      v-if="!hiddenUIElements.checkoutInformationDelivery"
      class="delivery-note"
    >
      <h5 class="delivery-note--headline">
        {{ $t('cart.deliveryNote') }}
      </h5>
      <h6>
        {{ $t('cart.deliveryDetails') }}
      </h6>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'

export default defineComponent({
  name: 'PriceInformation',
  components: { ContentCTABox },
  setup() {
    // TODO: this initialization needs to be updated after implementing the cartStore
    const hiddenUIElements = {
      checkoutInformationSpecificPrices: false,
      checkoutInformationDelivery: true,
    }

    return { hiddenUIElements }
  },
})
</script>

<style lang="scss">
.delivery-note {
  @apply tw-bg-pv-grey-96;
  @apply tw-p-6;
  @apply tw-rounded-md;

  &--headline {
    @apply tw-mb-6;
  }
}
</style>
