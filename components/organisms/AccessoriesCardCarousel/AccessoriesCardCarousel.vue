<template>
  <div class="accessories-card-carousel">
    <ContentWrapper>
      <h2 class="accessories-card-carousel__headline">{{ headline }}</h2>
    </ContentWrapper>
    <GenericCarousel>
      <template #slides>
        <div v-for="entry in entries" :key="entry.id">
          <AccessoriesCard :product="entry.target" />
        </div>
      </template>
    </GenericCarousel>
  </div>
</template>

<script>
import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AccessoriesCardCarousel',
  components: { GenericCarousel, ContentWrapper },
  props: {
    /**
     * Headline of the carousel
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * Slider items
     */
    entries: {
      type: Array,
      default: () => [],
    },
  },
  // setup() {},
})
</script>
<style lang="scss">
.accessories-card-carousel {
  &__headline {
    @apply tw-mb-4;
  }
}
</style>
