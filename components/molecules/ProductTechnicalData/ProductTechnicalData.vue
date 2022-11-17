<template>
  <ul v-if="(features || []).length > 0" class="technical-data">
    <li
      v-for="(feature, index) in features"
      :key="index"
      class="technical-data__feature"
    >
      <div class="technical-data__child">
        <!-- eslint-disable vue/no-v-html -->
        <span v-html="sanitizer.inline(feature.name || '')" />
        <!-- eslint-enable vue/no-v-html -->
      </div>
      <div class="technical-data__child">
        <!-- eslint-disable vue/no-v-html -->
        <span
          v-for="(el, i) in feature.featureValues"
          :key="i"
          v-html="sanitizer.block(getFeatureText(feature, el))"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </li>
  </ul>
</template>

<script>
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'

export default {
  name: 'ProductTechnicalData',
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const sanitizer = useSanitizer()

    const getFeatureText = (feature, el) => {
      return el.value ? `${el.value} ${feature.featureUnit?.name || ''}` : ''
    }

    return { sanitizer, getFeatureText }
  },
}
</script>

<style lang="scss" scoped>
.technical-data {
  @apply tw-grid tw-grid-cols-6;
  @apply tw-gap-x-8;
  @apply tw-py-8 tw-px-4;
  @apply tw-list-none;

  @screen lg {
    @apply tw-grid tw-grid-cols-12;
  }

  &__feature {
    @apply tw-grid tw-grid-cols-6;
    @apply tw-col-span-6;
    @apply tw-bg-pv-grey-96;
    @apply tw-p-4;

    &:nth-child(even) {
      @apply tw-bg-pv-white;
    }

    @screen lg {
      @apply tw-grid tw-grid-cols-12;
      @apply tw-col-span-6;

      // Override color with help of specific selector
      &:nth-child(n) {
        @apply tw-bg-pv-grey-96;
      }

      &:nth-child(4n-1),
      &:nth-child(4n) {
        @apply tw-bg-pv-white;
      }
    }
  }

  &__child {
    @apply tw-col-span-3;
    @apply tw-text-left;
    @apply tw-break-words;

    &:first-child {
      @apply tw-mr-4;
    }

    @screen lg {
      @apply tw-col-span-6;
    }

    span {
      @apply tw-block;
    }
  }
}
</style>
