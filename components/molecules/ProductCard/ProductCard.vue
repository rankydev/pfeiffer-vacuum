<template>
  <GenericCard :image-size="'contain'" :href="''">
    <template #image>
      <ResponsiveImage
        :image="image"
        aspect-ratio="16:9"
        :provider="'static'"
      />
    </template>
    <template #subheading>
      {{ product.categories[0].name }}
    </template>
    <template #heading>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="product.name" />
    </template>
    <template #description>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="product.description" />
    </template>
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
