<template>
  <div class="accessories-card-carousel">
    <h2>{{ headline }}</h2>
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
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AccessoriesCardCarousel',
  components: { GenericCarousel },
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
  setup() {},
})
</script>
