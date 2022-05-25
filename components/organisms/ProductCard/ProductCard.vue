<template>
  <GenericCard :image-size="'contain'">
    <template #image>
      <ResponsiveImage
        v-if="(image || {}).originalFilename"
        :image="image"
        aspect-ratio="16:9"
      />
    </template>
    <template #subheading>
      {{ product.categories[0].name }}
    </template>
    <template #heading>
      <span v-html="product.name" />
    </template>
    <template #tags></template>
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

export default defineComponent({
  components: {},
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
    const productStore = useProductStore
    console.log('test')
    console.log(productStore)

    // const p = productStore.getProductById(props.productID)

    const product = {
      categories: [
        {
          id: 'HIPACE__80',
          name: 'Product Category',
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
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ornare est diam aliquet turpis enim felis bibendum net…',
      images: [
        {
          altText: 'HiPace® 80 for TCP 350, DN 63 ISO-K',
          format: 'product',
          imageType: 'PRIMARY',
          url: 'https://s3-alpha-sig.figma.com/img/033b/dea9/9f70aca9d3145d447e48fcca9b5c2a9f?Expires=1654473600&Signature=XgK0WlT01RiuSSnK02gmCGT~7d1SfufChxeOZkD8uzmAVBmoMON8ATvyvXPt02EGReClbU~KmaR9-HBs1tDOKasXO3gJjM0EAaAc7xuCyjLCEMnBVBqZNWGsx~YaC3363UXEo92fOmyprnLO2HgxpamyWQrOXYYZGcNL~7ES2JzI3suuC9koJ9-HGZQNFCIZozWKtlA39M89stkBnfg0A2UOBNFjJSzzP7CDT5suYFT1nMw87c8nMsG2jr8x6HbxjYjx7~HJjBavY-iiDt2dIlTGGZu7P5wDnhkGP6sEQU8PFWjNTzDNdUsYRiI~M1k3a2Qi2bTauUfnZ19Zrzr0bA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        },
      ],
      name: 'Product variant name',
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

    const image = {
      alt: product.images[0].altText,
      copyright: '',
      fieldtype: 'asset',
      filename: product.images[0].url,
      filenamePreload: product.images[0].url,
      filenameWebp: product.images[0].url,
      focus: null,
      id: 4192972,
      name: '',
      originalFilename:
        'https://a.storyblok.com/f/152324/1250x846/e9830940f5/matterhorn.jpg',
      originalResolution: {
        height: 846,
        width: 1250,
      },
    }

    return { product, image }
  },
})
</script>

<style lang="scss"></style>
