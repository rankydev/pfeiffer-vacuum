<template>
  <ContentCTABox :headline="headline" :description="description" />
</template>

<script>
import {
  computed,
  defineComponent,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'

export default defineComponent({
  name: 'PriceInformation',
  components: { ContentCTABox },
  props: {
    currentCart: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { i18n } = useContext()
    const { currentCart } = toRefs(props)

    const isPriceInformation = computed(
      () =>
        !currentCart.value.hiddenUIElements.checkoutInformationSpecificPrices
    )
    const isDeliveryInformation = computed(
      () => !currentCart.value.hiddenUIElements.checkoutInformationDelivery
    )

    const headline = computed(() => {
      if (isPriceInformation.value)
        return i18n.t('cart.priceInformationHeadline')

      if (isDeliveryInformation.value) return i18n.t('cart.deliveryNote')

      return ''
    })

    const description = computed(() => {
      if (isPriceInformation.value)
        return [
          { component: 'Richtext', richtext: i18n.t('cart.priceInformation1') },
          { component: 'Richtext', richtext: i18n.t('cart.priceInformation2') },
        ]

      if (isDeliveryInformation.value)
        return [
          { component: 'Richtext', richtext: i18n.t('cart.deliveryDetails') },
        ]

      return ''
    })

    return {
      headline,
      description,
    }
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
