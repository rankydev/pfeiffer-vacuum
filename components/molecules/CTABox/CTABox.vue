<template>
  <div class="cta-box">
    <ResponsiveImage
      provider="storyblok"
      :image="image"
      :aspect-ratio="'2:1'"
    />
    <div class="cta-box__content">
      <NuxtDynamic
        v-for="item in description"
        :key="item._uid"
        v-bind="item"
        class="cta-box__description"
        :name="item.uiComponent || item.component"
      />
      <div class="cta-box__button-wrapper">
        <NuxtDynamic
          v-for="item in button"
          :key="item._uid"
          class="cta-box__button"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
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
      required: true,
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
.cta-box {
  @apply tw-overflow-hidden;
  @apply tw-rounded-lg;

  .responsive-image {
    img {
      @apply tw-rounded-t-lg;
      @apply tw-rounded-b-none;
    }
  }

  &__content {
    @apply tw-bg-pv-grey-16;
    @apply tw-text-center;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-items-center;
  }

  &__button-wrapper {
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
    @apply tw-mt-4;
    @apply tw-text-pv-white;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    span {
      @apply tw-text-pv-white;
    }
  }
}
</style>
