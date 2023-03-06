<template>
  <div class="confirmation">
    <h2 class="confirmation__headline">
      {{ $t('checkout.requestSuccess') }}
    </h2>
    <div class="confirmation__description">
      <div>
        {{ $t('checkout.requestDescription') }}
      </div>
    </div>
    <div class="confirmation__requestNumber">
      <Icon icon="check" class="confirmation__requestNumber--icon" />
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
        :href="localePath('shop-my-account-request-history') + '/' + order.code"
        icon="arrow_forward"
        :label="$t('checkout.viewRequest')"
      />
      <Button
        variant="secondary"
        shape="outlined"
        :href="localePath('/')"
        icon="arrow_back"
        :label="$t('checkout.backToHomepage')"
        :prepend-icon="true"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
})
</script>

<style lang="scss">
.confirmation {
  @apply tw-grid tw-grid-cols-12;
  @apply tw-text-center;
  @apply tw-w-fit;

  &__headline {
    @apply tw-col-span-12;
    @apply tw-mb-6;
    @apply tw-text-2xl;
    @apply tw-leading-9;

    @screen lg {
      @apply tw-text-4xl;
      @apply tw-leading-11;
    }
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
    @apply tw-mb-6;

    @screen md {
      @apply tw-mb-9;
    }

    @screen lg {
      @apply tw-mb-12;
    }

    &--icon {
      @apply tw-relative;
      top: -32px;
      @apply tw-text-pv-green;
      @apply tw-bg-pv-white;
      border-width: thick;
      @apply tw-rounded-full;
      font-size: 53.33px !important;
    }

    &--subline {
      @apply tw-mb-2;
      @apply tw-text-pv-white;
      top: -12px;
      @apply tw-relative;

      @screen lg {
        @apply tw-mb-4;
      }
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

    button:last-of-type {
      @apply tw-justify-start;
    }
  }
}
</style>
