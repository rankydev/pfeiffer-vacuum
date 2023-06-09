<template>
  <div class="product-information">
    <div class="product-information__info">
      <div class="product-information__content">
        <ul
          v-if="!isMaster && hasFootnotes"
          class="product-information__footnotes"
        >
          <!-- eslint-disable vue/no-v-html -->
          <li
            v-for="(footnote, index) in product.footnotes"
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
import { useProductStore } from '~/stores/product'
import Button from '~/components/atoms/Button/Button'

export default {
  name: 'ProductInformation',
  components: {
    Button,
  },
  setup() {
    const sanitizer = useSanitizer()
    const { product } = useProductStore()

    const hasFootnotes = computed(() => product?.footnotes?.length > 0 || false)
    const isMaster = computed(() => product?.productType === 'MASTERPRODUCT')

    return { sanitizer, hasFootnotes, isMaster, product }
  },
}
</script>

<style lang="scss">
.product-information {
  @apply tw-w-full;
  @apply tw-grid;
  @apply tw-grid-cols-12;
  @apply tw-gap-6;
  @apply tw-pt-6;
  @apply tw-px-5;

  @screen md {
    @apply tw-pt-8;
    @apply tw-px-0;
  }

  @screen lg {
    @apply tw-pt-12;
  }

  &__info {
    @apply tw-col-span-12;

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

  &__footnotes {
    @apply tw-col-span-12;
    @apply tw-list-none;

    @screen md {
      @apply tw-col-span-6;
    }
  }

  &__bullets {
    @apply tw-col-span-12;
    @apply tw-list-none;

    &--small {
      @screen md {
        @apply tw-col-span-6;
      }
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
      @apply tw-bg-pv-red;
      content: '';
      @apply tw-h-2;
      @apply tw-w-2;
      @apply tw-text-xs;
      @apply tw-leading-5;
      @apply tw-absolute;
      @apply tw-top-2;
      @apply tw-left-0;
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
