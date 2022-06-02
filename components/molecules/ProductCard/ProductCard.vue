<template>
  <GenericCard v-bind="{ imageSize }" :href="''">
    <template #image>
      <ResponsiveImage
        provider="storyblok"
        :image="product.images[0].url"
        :aspect-ratio="'2:1'"
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
    <template #additionalInfo>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ornare
        est diam aliquet turpis enim felis bibendum net…
      </p>
    </template>
  </GenericCard>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {
    /**
     * productID that specifies Product Card
     */
    productID: {
      type: String,
      default: '',
    },
  },
  setup() {
    const product = {
      categories: [
        {
          id: 'HIPACE__80',
          name: 'HiPace® 80',
        },
      ],
      categoryPath: [
        {
          id: 'PUMPS',
          name: 'Pumps',
        },
        {
          id: 'TURBOPUMPS',
          name: 'Turbopumps',
        },
        {
          id: 'HIPACE__80',
          name: 'HiPace® 80',
        },
      ],
      code: '128ee16d-cb90-45be-9986-c8006a5235e6_sample',
      configurable: false,
      description: '',
      images: [
        {
          altText: 'HiPace® 80 for TCP 350, DN 63 ISO-K',
          format: 'product',
          imageType: 'PRIMARY',
          url: '/medias/?context=bWFzdGVyfGltYWdlc3wzNTE0Njd8aW1hZ2UvcG5nfGgzNy9oMjMvODgxOTQ1NzA2NDk5MHw5MjM5ZmNhYWRkODlmYWZlMWY5ODhlODA5NWYwOGM2ODAzZDlkM2FlMzkxYWZkZjhlZjVlNzJmOWM1NjMwNTZm',
        },
      ],
      name: 'HiPace® 80',
      numberOfVariants: 21,
      priceRange: {},
      productType: 'MASTERPRODUCT',
      purchasable: false,
      stock: {
        stockLevel: 0,
        stockLevelStatus: 'outOfStock',
      },
      summary: '',
      url: '/Pumps/Turbopumps/HiPace%C2%AE-80/HiPace%C2%AE-80/p/128ee16d-cb90-45be-9986-c8006a5235e6_sample',
    }

    return { product }
  },
})
</script>

<style lang="scss"></style>
