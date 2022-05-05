<template>
  <div class="cta">
    <div>
      <ResponsiveImage
        provider="storyblok"
        :image="image"
        :aspect-ratio="'2:1'"
      />
    </div>

    <div class="cta__sectionBelow">
      <div class="cta__sectionBelowContent">
        <div class="cta__sectionBelowText">
          <NuxtDynamic
            v-for="item in description"
            :key="item._uid"
            v-bind="item"
            class="cta__description"
            :component="item.uiComponent || item.component"
          />
        </div>
        <div class="cta__sectionBelowButton">
          <NuxtDynamic
            v-for="item in button"
            :key="item._uid"
            class="cta__button"
            v-bind="item"
            :component="item.uiComponent || item.component"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  components: {
    ResponsiveImage,
  },
  props: {
    /**
     * The image
     */
    image: {
      type: [Object, String],
      default: () => {},
    },
    /**
     * Subcomponent which is rendered underneath the image
     */
    description: {
      type: Array,
      default: () => [],
    },
    /**
     * buttons appended to the richtext
     */
    button: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.cta {
  @apply tw-overflow-hidden;
  @apply tw-rounded-lg;

  .responsive-image {
    img {
      @apply tw-rounded-t-lg;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__sectionBelow {
    @apply tw-bg-pv-grey-16;
    @apply tw-text-center;
  }

  &__sectionBelowContent {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-items-center;
  }

  &__sectionBelowText {
    @apply tw-mt-4;
  }

  &__sectionBelowButton {
    @apply tw-mt-4;
    @apply tw-mb-6;
    @apply tw-px-4;
    @apply tw-flex;
    @apply tw-w-full;

    @screen md {
      @apply tw-inline;
    }
  }

  &__button {
    @apply tw-basis-full;
  }

  &__description {
    @apply tw-text-pv-white;
  }
}
</style>
