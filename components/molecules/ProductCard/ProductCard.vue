<template>
  <GenericCard
    :has-link="false"
    image-size="cover"
    :href="(product || {}).url || ''"
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
      <!-- TODO: We need to bin in sanitizer for v-html -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="name || ''" />
    </template>
    <template #description>
      <!-- TODO: We need to bin in sanitizer for v-html -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="description || ''" />
    </template>
    <template #additionalInfo>
      <template v-if="product.orderNumber">
        <span>{{ product.orderNumber }}</span>
      </template>

      <template v-else-if="product.numberOfVariants">
        <span class="product-card__variants">
          <Icon class="tw-mr-1 tw-font-bold" icon="menu" size="small" />
          {{ $tc('product.variantsAvailable', product.numberOfVariants) }}
        </span>
      </template>
    </template>
  </GenericCard>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

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
    const description = computed(() => props.product.description)
    const name = computed(() => props.product.name)
    const categoryName = computed(() => props.product.categories?.[0]?.name)

    return { image, name, categoryName, description }
  },
})
</script>

<style lang="scss">
.product-card {
  &__variants {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-text-pv-red;
    @apply tw-font-bold;
  }
}
</style>
