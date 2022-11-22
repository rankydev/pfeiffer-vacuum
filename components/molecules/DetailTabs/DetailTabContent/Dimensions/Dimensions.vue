<template>
  <div v-if="product" class="dimensions-tab">
    <div
      class="dimensions-tab__image-wrapper"
      :class="{ 'dimensions-tab__image-wrapper--half': dimensions.length > 0 }"
    >
      <img
        :src="getDimensionPicture()"
        alt="Dimensions Image"
        class="dimensions-tab__image"
      />
    </div>

    <div class="dimensions-tab__feature-wrapper">
      <div
        v-for="(feature, index) in dimensions"
        :key="index"
        class="dimensions-tab__feature-row"
      >
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="dimensions-tab__feature-col"
          v-html="sanitizer.inline(feature.name)"
        ></div>
        <div
          class="dimensions-tab__feature-col"
          v-html="sanitizer.block(getFeatureText(feature))"
        ></div>
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'
import { useImageHelper } from '~/composables/useImageHelper/useImageHelper'
import { useTabsHelper } from '../../partials/useTabsHelper'

export default defineComponent({
  name: 'Dimensions',
  setup() {
    const { product } = useProductStore()
    const sanitizer = useSanitizer()
    const { getShopMedia } = useImageHelper()
    const { getSortedFeatures } = useTabsHelper()

    const dimensions = computed(() => {
      return getSortedFeatures(product, 'Dimension')
    })

    const getFeatureText = (feature) => {
      const value = feature.featureValues?.[0]?.value
      const unit = feature.featureUnit?.name || ''
      return `${value} ${unit}`
    }

    const getDimensionPicture = () => {
      const picture = product.dimensionImage

      if (!picture) {
        return null
      }

      return getShopMedia(picture.url)
    }

    return {
      product,
      dimensions,
      getFeatureText,
      getDimensionPicture,
      sanitizer,
    }
  },
})
</script>

<style lang="scss">
.dimensions-tab {
  @apply tw-mt-8;
  @apply tw-grid;
  @apply tw-grid-cols-12;
  @apply tw-gap-6;

  &__image-wrapper {
    @apply tw-col-span-12;

    &--half {
      @screen md {
        @apply tw-col-span-6;
      }
    }
  }

  &__image {
    @apply tw-mx-auto;
  }

  &__feature-wrapper {
    @apply tw-col-span-12;
    @apply md:tw-col-span-6;
  }

  &__feature-row {
    @apply tw-grid;
    @apply tw-grid-cols-2;
    @apply tw-bg-pv-grey-96;
    @apply tw-p-4;

    &:nth-child(2n) {
      @apply tw-bg-pv-white;
    }
  }

  &__feature-col {
    @apply tw-col-span-1;
  }
}
</style>
