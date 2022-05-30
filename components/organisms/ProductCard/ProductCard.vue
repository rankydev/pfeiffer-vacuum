<template>
  <GenericCard :image-size="'contain'" :href="''">
    <template #image>
      <ResponsiveImage
        v-if="(image || {}).url"
        :image="image"
        aspect-ratio="16:9"
        provider="static"
      />
    </template>
    <template #subheading>
      {{ product.categories[0].name }}
    </template>
    <!-- eslint-disable vue/no-v-html -->
    <template #heading>
      <span v-html="product.name" />
    </template>
    <template #tags></template>
    <!-- eslint-disable vue/no-v-html -->
    <template #description>
      <p v-html="product.description" />
    </template>
    <template #additionalInfo><p>Order Number</p></template>
    <template #actionItems></template>
  </GenericCard>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/products/products.js'
import ResponsiveImage from '@/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  components: { ResponsiveImage },
  props: {
    /**
     * productID that specifies Product Card
     */
    productID: {
      type: String,
      default: '128ee16d-cb90-45be-9986-c8006a5235e6_sample',
    },
  },
  setup(props) {
    const store = useProductStore()
    const product = store.getProductById(props.productID)

    const image = product.images[0]

    return { product, image }
  },
})
</script>

<style lang="scss"></style>
