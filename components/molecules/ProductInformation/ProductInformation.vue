<template>
  <div class="product-information">
    <div class="product-information__info">
      <h4>
        {{ $t('product.productInformation') }}
      </h4>

      <div class="product-information__content">
        <ul
          v-if="!isMaster && hasFootnotes"
          class="product-information__footnotes"
        >
          <!-- eslint-disable vue/no-v-html -->
          <li
            v-for="(footnote, index) in (product || {}).footnotes"
            :key="index"
            class="product-information__footnote"
            v-html="sanitizer.block(footnote)"
          />
          <!-- eslint-enable vue/no-v-html -->
        </ul>

        <ul
          :class="[
            'product-information__bullets',
            {
              'product-information__bullets--small': !isMaster && hasFootnotes,
            },
          ]"
        >
          <!-- eslint-disable vue/no-v-html -->
          <li
            v-for="(bullet, index) in (product || {}).bullets"
            :key="index"
            class="product-information__bullet"
            v-html="sanitizer.block(bullet)"
          />
          <!-- eslint-enable vue/no-v-html -->
        </ul>
      </div>

      <div v-if="isMaster" class="product-information__details-footnote">
        <span class="product-information__select-variant-info">
          {{ $t('product.selectVariantExplained') }}
        </span>
        <Button
          :label="$t('product.scrollToVariantSelection')"
          variant="secondary"
          shape="outlined"
          size="normal"
          icon="arrow_upward"
          anchor="#variantselection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'
import Button from '~/components/atoms/Button/Button'

export default {
  name: 'ProductInformation',
  components: {
    Button,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const sanitizer = useSanitizer()
    const hasFootnotes = computed(
      () => props.product?.footnotes?.length > 0 || false
    )
    const isMaster = computed(
      () => props.product?.productType === 'MASTERPRODUCT'
    )

    return { sanitizer, hasFootnotes, isMaster }
  },
}
</script>

<style lang="scss">
.product-information {
  @apply tw-grid;
  @apply tw-grid-cols-12;
  @apply tw-gap-6;
  @apply tw-pt-10;

  &__info {
    @apply tw-col-span-12;

    h4 {
      @apply tw-mb-4;

      @screen lg {
        @apply tw-mb-6;
      }
    }

    &--small {
      @apply tw-col-span-6;
    }
  }

  &__content {
    @apply tw-grid;
    @apply tw-grid-cols-12;
    @apply tw-gap-6;
    @apply tw-mb-6;

    @screen md {
      @apply tw-mb-0;
    }
  }

  &__bullets,
  &__footnotes {
    @apply tw-col-span-12;
    @apply tw-list-none;

    @screen md {
      @apply tw-col-span-6;
    }

    &--small {
      @apply tw-col-span-6;
    }
  }

  &__footnote:not(:last-child) {
    @apply tw-pb-4;
  }

  &__bullet {
    @apply tw-pl-4;
    @apply tw-relative;

    &:not(:last-child) {
      @apply tw-mb-2;
    }

    &::before {
      @apply tw-text-pv-red;
      content: '\25A0';
      @apply tw-text-xs;
      @apply tw-leading-5;
      @apply tw-absolute;
      top: 0;
      left: 0;

      @screen md {
        @apply tw-text-xl;
      }
    }
  }

  &__select-variant-info {
    @apply tw-block;
    @apply tw-mb-4;
  }

  &__anchor {
    @apply tw-flex;
    @apply tw-items-center;
  }
}
</style>
