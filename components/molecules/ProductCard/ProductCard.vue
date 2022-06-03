<template>
  <GenericCard :image-size="'contain'" :href="(product || {}).url || ''">
    <template #image>
      <ResponsiveImage
        :image="image"
        aspect-ratio="16:9"
        :provider="'static'"
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
import { useProductStore } from '~/stores/products'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  components: { ResponsiveImage },
  props: {
    /**
     * productData that specifies Product Card
     */
    productData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const store = useProductStore()
    const product = computed(() =>
      props.productData.code ? store.getProductById(props.productData.code) : {}
    )
    const image = computed(() => product.value.images?.[0])
    const productUrl = computed(() => product.value.url)

    return { product, image, productUrl }
  },
})
</script>

<style lang="scss"></style>
