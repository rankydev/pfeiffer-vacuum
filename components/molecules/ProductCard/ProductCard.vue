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
        :text="'<p>Plain text can be added <u>also with underline</u> or <strong>strong</strong></p>'"
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
