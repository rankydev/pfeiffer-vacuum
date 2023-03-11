<template>
  <ContentCTABox
    v-if="validType"
    :headline="headline"
    :description="description"
  />
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'

export default defineComponent({
  name: 'PriceInformation',
  components: { ContentCTABox },
  props: {
    informationType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { i18n } = useContext()

    const validType = computed(() => {
      return (
        props.informationType === 'price' ||
        props.informationType === 'delivery'
      )
    })

    const availableHeadlines = {
      price: i18n.t('cart.priceInformationHeadline'),
      delivery: i18n.t('cart.deliveryNote'),
    }

    const buildDescriptionObject = (key) => {
      return {
        component: 'Richtext',
        richtext: i18n.t(`cart.${key}`),
      }
    }

    const availableDescriptions = {
      price: [
        buildDescriptionObject('priceInformation1'),
        buildDescriptionObject('priceInformation2'),
      ],
      delivery: [buildDescriptionObject('deliveryDetails')],
    }

    const headline = computed(() => {
      return validType.value ? availableHeadlines[props.informationType] : ''
    })

    const description = computed(() => {
      return validType.value ? availableDescriptions[props.informationType] : ''
    })

    return {
      headline,
      description,
      validType,
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
