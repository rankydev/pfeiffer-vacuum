<template>
  <div class="confirmation">
    <div class="confirmation__headline">
      <h3 class="lg:tw-hidden">
        {{ $t('checkout.requestSuccess') }}
      </h3>
      <h2 class="tw-hidden lg:tw-block">
        {{ $t('checkout.requestSuccess') }}
      </h2>
    </div>
    <div class="confirmation__description">
      <h6 class="sub md:tw-hidden">
        {{ $t('checkout.requestDescription') }}
      </h6>
      <h5 class="sub tw-hidden md:tw-block">
        {{ $t('checkout.requestDescription') }}
      </h5>
    </div>
    <div class="confirmation__requestNumber">
      <h3 class="sub tw-mb-6">
        {{ $t('checkout.requestNumber') }}
      </h3>
      <h3 class="tw-mb-6">1234567890</h3>
      <h6 class="sub">
        {{ $t('checkout.requestSupport') }}
      </h6>
    </div>
    <div class="tw-col-span-12 tw-mb-4 text-center">
      <Button
        variant="primary"
        :to="localePath('shop-my-account-request-history') + '/' + '1234567890'"
        icon="arrow_forward"
        :label="$t('checkout.viewRequest')"
      />
    </div>
    <div class="tw-col-span-12 tw-text-center">
      <Button
        variant="secondary"
        class="back"
        :to="localePath('shop')"
        icon="arrow_forward"
        :label="$t('checkout.backToHomepage')"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'Confirmation',
  components: { Button },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.order) {
      this.prepareDataLayer()
    }
  },
  methods: {
    prepareDataLayer() {
      const totalPrice = this.order.totalPrice.value.toFixed(2)
      const ecommerceItems = []
      for (const entry of this.order.entries) {
        const product = entry.product
        const productCategories = product.categoryPath
        const basePrice = entry?.basePrice?.value

        const tmpObj = {
          item_name: product.name,
          item_id: product.code,
          price: basePrice ? basePrice.toFixed(2) : null,
          item_brand: null,
          item_category: productCategories?.[0]?.id || null,
          item_category_2: productCategories?.[1]?.id || null,
          item_category_3: productCategories?.[2]?.id || null,
          item_category_4: productCategories?.[3]?.id || null,
          quantity: entry.quantity,
        }

        ecommerceItems.push(tmpObj)
      }

      const dataLayerData = {
        event: 'purchase',
        ecommerce: {
          purchase: {
            transaction_id: this.order.code, // ID of the transaction / quote
            value: totalPrice.toString(), // Total value of the transaction / quote
            currency: totalPrice.currencyIso, // Currency
            items: ecommerceItems,
          },
        },
      }
      /* eslint-enable */

      this.$store.dispatch('pushToDataLayer', dataLayerData)
    },
  },
})
</script>

<style lang="scss" scoped>
.confirmation {
  @apply tw-grid tw-grid-cols-12;
  @apply tw-text-center;

  &__headline {
    @apply tw-col-span-12;
    @apply tw-mb-6;
  }

  &__description {
    @apply tw-col-span-12;
    @apply tw-mb-12;
  }

  &__requestNumber {
    @apply tw-col-span-12;
    @apply tw-mb-12;
  }
}
</style>
