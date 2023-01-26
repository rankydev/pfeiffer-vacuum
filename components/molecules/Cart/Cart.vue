<template>
  <div class="order-discount">
    <div class="order-discount__additional-information">
      <PromotionLabel
        v-for="(promo, x) in cartPromotions"
        :key="x"
        variant="normal"
        class="order-discount__additional-information--promotion"
      >
        {{ promo.promotion.description }}
      </PromotionLabel>
      <PriceInformation v-if="showReference" />
    </div>
    <div class="order-discount__net-information">
      <TotalNetInformation />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'
import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel'
import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation'

export default defineComponent({
  name: 'Cart',
  components: { PriceInformation, PromotionLabel, TotalNetInformation },
  props: {
    showReference: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // TODO: this initialization needs to be updated after implementing the cartStore
    const currentCart = {
      appliedOrderPromotions: [
        {
          promotion: {
            description: 'You get 20% discount on your entire shopping cart',
          },
        },
      ],
    }

    let cartPromotions = computed(
      () => currentCart?.appliedOrderPromotions || []
    )

    return { cartPromotions }
  },
})
</script>

<style lang="scss" scoped>
.order-discount {
  @apply tw-grid;
  @apply tw-grid-cols-12;
  @apply tw-pt-1;

  @screen md {
    @apply tw-pt-5;
  }

  &__additional-information {
    @apply tw-col-span-12;
    @apply tw-mb-6;

    @screen md {
      @apply tw-col-span-6;
      @apply tw-mb-2;
      @apply tw-pr-8;
      @apply tw-mb-0;
    }

    @screen lg {
      padding-right: 150px;
      @apply tw-col-span-8;
    }

    &--promotion {
      @apply tw-mb-4;
    }
  }

  &__net-information {
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-6;
    }

    @screen lg {
      @apply tw-col-span-4;
    }
  }
}
</style>
