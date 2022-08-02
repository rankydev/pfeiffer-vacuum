<template>
  <div>
    <div @click="toggleModal()">
      <GenericCard
        :has-link="false"
        image-size="contain"
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
      </GenericCard>
    </div>
    <div>
      <InformationModal
        :is-open="isModalOpen"
        :headline="'Your personal Price'"
        :text="'<p>Plain text can be added <u>also with underline</u> or <strong>strong</strong></p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est velit pharetra tincidunt rhoncus, sed. Morbi auctor neque in senectus nec, cursus urna augue varius. Natoque enim massa suscipit vitae ullamcorper mauris quis duis. Suspendisse risus, sapien commodo pulvinar. Sociis sollicitudin sit aliquam, arcu urna. Viverra vel parturient mauris sed sed sed platea etiam. Lectus id ultricies eu fermentum, at egestas ut.Eget in tellus, vitae tincidunt quam quis. Cursus faucibus integer mauris sagittis tellus scelerisque porttitor eget. Velit enim nec malesuada mauris pellentesque cras nullam convallis. Lectus netus quis nunc ac consequat fermentum, sem lectus. Lectus nam semper sollicitudin nisl elit. Et interdum felis et aenean. Nisl, bibendum eros arcu adipiscing etiam sagittis volutpat tempor dui. A neque eu massa fermentum adipiscing augue convallis quis turpis. Viverra amet eget donec dictumst varius. Est amet et nibh elementum tellus viverra.'"
        @closeModal="toggleModal()"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import InformationModal from '~/components/molecules/InformationModal/InformationModal'

export default defineComponent({
  components: { ResponsiveImage, InformationModal },
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

    const isModalOpen = ref(false)

    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value
    }

    return { image, name, categoryName, description, toggleModal, isModalOpen }
  },
})
</script>

<style lang="scss"></style>
