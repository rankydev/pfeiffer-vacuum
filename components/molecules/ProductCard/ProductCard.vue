<template>
  <GenericCard image-size="contain" :href="(product || {}).url || ''">
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

<style lang="scss"></style>
