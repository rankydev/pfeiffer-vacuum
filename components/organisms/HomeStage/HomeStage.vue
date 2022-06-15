<template>
  <GenericCarousel
    v-if="slides.length > 1"
    is-wide
    :infinite="infinite"
    :autoplay="autoplay"
    :autoplay-speed="autoplaySpeed"
    class="home-stage"
    variant="homeStage"
  >
    <template #slides>
      <HomeStageSlide
        v-for="slide in slides"
        :key="slide._uid"
        v-editable="slide"
        v-bind="slide"
      />
    </template>
  </GenericCarousel>

  <HomeStageSlide
    v-else-if="slides.length === 1"
    :stage-content="slides[0].stageContent"
    :image="slides[0].image"
    :interlay="slides[0].interlay"
    :bubble="slides[0].bubble"
  />

  <div v-else />
</template>

<script>
import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel.vue'
import HomeStageSlide from '~/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HomeStage',
  components: { HomeStageSlide, GenericCarousel },
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
      default: true,
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
})
</script>

<style lang="scss"></style>
