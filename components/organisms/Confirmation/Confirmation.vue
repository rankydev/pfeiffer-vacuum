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
      <div>
        {{ $t('checkout.requestDescription') }}
      </div>
    </div>
    <div class="confirmation__requestNumber">
      <Icon
        icon="check_circle_outline"
        class="confirmation__requestNumber--icon"
        size="xlarge"
      />
      <h3 class="confirmation__requestNumber--subline tw-font-normal">
        {{ $t('checkout.requestNumber') }}
      </h3>
      <h3 class="confirmation__requestNumber--subline">{{ order.code }}</h3>
      <h5 class="confirmation__requestNumber--subline">
        {{ $t('checkout.requestSupport') }}
      </h5>
    </div>
    <div class="confirmation__buttons">
      <Button
        variant="secondary"
        :to="localePath('shop-my-account-request-history') + '/' + order.code"
        icon="arrow_forward"
        :label="$t('checkout.viewRequest')"
      />
      <Button
        variant="secondary"
        shape="outlined"
        :to="localePath('shop')"
        icon="arrow_back"
        :label="$t('checkout.backToHomepage')"
        :prepend-icon="true"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'Confirmation',
  components: { Button, Icon },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { app } = useContext()
    const { isMobile } = app.$breakpoints

    return { isMobile }
  },
})
</script>

<style lang="scss">
.confirmation {
  @apply tw-grid tw-grid-cols-12;
  @apply tw-text-center;
  @apply tw-w-fit;
  @apply tw-m-4;

  &__headline {
    @apply tw-col-span-12;
    @apply tw-mb-6;
  }

  &__description {
    @apply tw-col-span-12;
    @apply tw-mb-12;

    @screen lg {
      @apply tw-text-lg;
      @apply tw-leading-7;
    }
  }

  &__requestNumber {
    @apply tw-bg-pv-green;
    @apply tw-rounded-lg;
    @apply tw-col-span-12;
    @apply tw-mb-12;

    &--icon {
      position: relative;
      top: -32px;
      @apply tw-text-pv-green;
      @apply tw-bg-pv-white;
    }

    &--subline {
      @apply tw-mb-6;
      @apply tw-text-pv-white;
      top: -12px;
      position: relative;
    }

    h5:last-of-type {
      @apply tw-mb-3;
      @apply tw-font-normal;
      @apply tw-px-6;
    }
  }

  &__buttons {
    @apply tw-col-span-12;
    @apply tw-mb-4;
    @apply tw-flex;
    @apply tw-flex-col;

    @screen md {
      @apply tw-flex-row-reverse;
      @apply tw-justify-between;
    }

    button:first-of-type {
      @apply tw-mb-4;

      @screen md {
        @apply tw-mb-0;
      }
    }
  }
}
</style>
