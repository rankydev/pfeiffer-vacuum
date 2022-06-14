<template>
  <GenericCarousel
    v-if="slides.length"
    is-wide
    :infinite="infinite"
    :autoplay="autoplay"
    :autoplay-speed="autoplaySpeed"
    class="home-stage-carousel"
    variant="homeStage"
  >
    <template #slides>
      <HomeStageModule
        v-for="slide in slides"
        :key="slide._uid"
        v-editable="slide"
        v-bind="slide"
      />
    </template>
  </GenericCarousel>
</template>

<script>
import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel.vue'
import HomeStageModule from '~/components/organisms/HomeStageCarousel/HomeStageModule/HomeStageModule'
export default {
  name: 'HomeStageCarousel',
  components: { HomeStageModule, GenericCarousel },
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
     * enables/ disables infinite wrap around items on slider
     */
    infinite: {
      type: Boolean,
      default: false,
    },
    /**
     * enables/ disables autoplay
     */
    autoplay: {
      type: Boolean,
      default: false,
    },
    /**
     * autoplay Speed in seconds, retrieves string from Storyblok
     */
    autoplaySpeed: {
      type: String,
      default: '5',
    },
  },
}
</script>

<style lang="scss"></style>
