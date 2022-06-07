<template>
  <GenericCard :image-size="'contain'" :href="(product || {}).url || ''">
    <template #image>
      <ResponsiveImage
        :image="image || {}"
        aspect-ratio="16:9"
        :provider="'hybris'"
      />
    </template>
    <template #subheading>
      {{ ((product.categories || [])[0] || {}).name || '' }}
    </template>
    <template #heading>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="product.name || ''" />
    </template>
    <template #description>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="product.description || ''" />
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
  },
  setup(props) {
    const image = computed(() => props.product.images?.[0])

    return { image }
  },
})
</script>

<style lang="scss"></style>
