<template>
  <div class="order-discount">
    <div class="order-discount__additional-information">
      <div
        v-if="true"
        class="order-discount__additional-information--promotion"
      >
        <PromotionLabel
          v-for="(promo, x) in cartPromotions"
          :key="x"
          variant="normal"
        >
          {{ promo.promotion.description }}
        </PromotionLabel>
      </div>
    </div>
    <div class="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-4">
      <TotalNetInformation />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'
import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel'

export default defineComponent({
  components: { PromotionLabel, TotalNetInformation },
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

    const cartPromotions = computed(
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
}
</style>
