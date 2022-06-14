<template>
  <div class="document-card-carousel">
    <ContentCarousel
      v-bind="{ headline, button, slides }"
      is-wide
      transparent
    />
  </div>
</template>
<script>
import ContentCarousel from '~/components/molecules/ContentCarousel/ContentCarousel'
export default {
  name: 'DocumentCardCarousel',
  components: { ContentCarousel },
  props: {
    /**
     * Slider items
     */
    slides: {
      type: Array,
      default: () => [],
      required: true,
    },
    /**
     * Headline of carousel
     */
    headline: {
      type: String,
      default: '',
      required: true,
    },
    /**
     * Optional button to link to configured page
     */
    button: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
