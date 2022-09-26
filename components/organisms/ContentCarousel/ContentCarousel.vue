<template>
  <ContentWrapper
    v-editable="slides"
    breakout
    :class="[
      'content-carousel',
      { 'content-carousel--with-background': !transparent },
    ]"
  >
    <ContentWrapper>
      <div class="content-carousel__content">
        <h2>{{ headline }}</h2>
        <NuxtDynamic
          v-for="btn in button"
          :key="btn._uid"
          v-bind="btn"
          :name="btn.uiComponent || btn.component"
        />
      </div>
      <GenericCarousel v-if="slides.length > 0" v-bind="carouselData">
        <template #slides>
          <NuxtDynamic
            v-for="(slide, index) in slides"
            :key="index"
            v-bind="slide"
            :name="slide.uiComponent || slide.component"
          />
        </template>
      </GenericCarousel>
    </ContentWrapper>
  </ContentWrapper>
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel.vue'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper.vue'

export default defineComponent({
  name: 'ContentCarousel',
  components: {
    GenericCarousel,
    ContentWrapper,
  },
  props: {
    /**
     * Headline of the carousel
     */
    headline: {
      type: String,
      default: '',
    },

    /**
     * Button which will be displayed above the carousel
     */
    button: {
      type: Array,
      default: () => [],
    },
    /**
     * Slider items
     */
    slides: {
      type: Array,
      default: () => [],
    },

    /**
     * enables/disables wide mode of carousel (breakout of ContentWrapper)
     */
    isWide: {
      type: Boolean,
      default: true,
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
     * autoplay speed in seconds, retrieves string from Storyblok
     */
    autoplaySpeed: {
      type: String,
      default: '5',
    },
    /**
     * toggle transparent background if necessary
     */
    transparent: {
      type: Boolean,
      default: false,
    },
    /**
     * set the variant for different slider types
     * @values default, homeStage
     */
    variant: {
      type: String,
      default: 'default',
      validator: (val) =>
        [
          'default',
          'homeStage',
          'documentCardCarousel',
          'customContentCardCarousel',
        ].includes(val),
    },
  },
  setup(props) {
    const carouselData = computed(() => ({
      isWide: props.isWide,
      infinite: props.infinite,
      autoplay: props.autoplay,
      autoplaySpeed: props.autoplaySpeed,
      variant: props.variant,
    }))

    return {
      carouselData,
    }
  },
})
</script>
<style lang="scss">
.content-carousel {
  @apply tw-py-6;

  @screen md {
    @apply tw-py-10;
  }

  @screen lg {
    padding-top: 52px;
    padding-bottom: 52px;
  }

  &--with-background {
    @apply tw-bg-pv-grey-96;
  }

  &__content {
    @apply tw-flex;
    @apply tw-flex-wrap;

    h2 {
      @apply tw-grow;
      @apply tw-w-full;
      @apply tw-block;
      @apply tw-pb-4;

      @screen md {
        @apply tw-pb-0;
      }
    }

    .button {
      @apply tw-grow;
      @apply tw-justify-end;
      @apply tw-mb-4;

      @screen md {
        @apply tw-mb-0;
      }
    }

    @screen md {
      @apply tw-flex-nowrap;
      @apply tw-justify-between;
      @apply tw-items-center;
      @apply tw-pb-4;
    }
  }
}
</style>
