<template>
  <div class="document-card-carousel">
    <ContentCarousel
      v-bind="{ headline, button, slides }"
      is-wide
      transparent
      variant="documentCardCarousel"
    >
      <template #slides>
        <DocumentCard
          v-for="slide in slides"
          :key="slide._uid"
          v-editable="slide"
          v-bind="slide"
        />
      </template>
    </ContentCarousel>
  </div>
</template>
<script>
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
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
