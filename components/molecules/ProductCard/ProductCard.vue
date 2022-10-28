<template>
  <GenericCard
    :has-link="false"
    image-size="contain"
    :href="(product || {}).url || ''"
    :class="{ 'product-card--master': product.numberOfVariants }"
  >
    <template #image>
      <ResponsiveImage
        :image="image || {}"
        aspect-ratio="16:9"
        :provider="provider"
      />
    </template>
    <template #subheading>
      {{ categoryName || '' }}
    </template>
    <template #heading>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="sanitizer.clear(name) || ''" />
    </template>
    <template #description>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="sanitizer.clear(description) || ''" />
    </template>
    <template #additionalInfo>
      <template v-if="product.orderNumber">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="sanitizer.clear(product.orderNumber)"></span>
      </template>

      <template v-else-if="product.numberOfVariants">
        <span class="product-card__variants">
          <Icon class="product-card__variant-icon" icon="menu" size="xsmall" />
          {{ $tc('product.variantsAvailable', product.numberOfVariants) }}
        </span>
      </template>
    </template>
  </GenericCard>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'

export default defineComponent({
  components: { ResponsiveImage },
  props: {
    /**
     * productData that specifies Product Card
     */
    product: {
      type: Object,
      default: () => ({}),
    },
    provider: {
      type: String,
      default: 'hybris',
    },
  },
  setup(props) {
    const image = computed(() => props.product.images?.[0])
    const description = computed(() => (props.product.bullets || []).join(', '))
    const name = computed(() => props.product.name)
    const categoryName = computed(() => props.product.categories?.[0]?.name)

    const sanitizer = useSanitizer()

    return { image, name, categoryName, description, sanitizer }
  },
})
</script>

<style lang="scss">
.product-card {
  &--master {
    @apply tw-border-2;
    @apply tw-border-pv-grey-80;
  }

  &__variants {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-text-pv-red;
    @apply tw-font-bold;
  }

  &__variant-icon {
    @apply tw-mr-1;
    @apply tw-font-bold;
  }

  em {
    @apply tw-not-italic;
  }
}
</style>
