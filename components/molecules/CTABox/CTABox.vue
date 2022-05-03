<template>
  <div class="cto">
    <div>
      <ResponsiveImage
        provider="storyblok"
        :image="image"
        :aspect-ratio="'2:1'"
      />
    </div>

    <div class="cto__sectionBelow">
      <div class="cto__sectionBelowContent">
        <div class="cto__sectionBelowText">
          <NuxtDynamic
            v-for="item in description"
            :key="item._uid"
            v-bind="item"
            class="cto__description"
            :component="item.uiComponent || item.component"
          />
        </div>
        <div class="cto__sectionBelowButton">
          <NuxtDynamic
            v-for="item in buttons"
            :key="item._uid"
            class="cto__button"
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

const DEFAULT_DATA = {
  image:
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  icon: '',
  sources: [],
  iframeAttributes: {},
}

export default defineComponent({
  components: {},
  props: {
    /**
     * The image
     */
    image: {
      type: Object,
      default: () => ({}),
    },
    /**
     * The title for the iframe and alt attribute for preview image
     */
    title: {
      type: String,
      default: 'CTA Box',
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
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {},
})
</script>

<style lang="scss">
.cto {
  @apply tw-overflow-hidden;
  @apply tw-rounded-lg;

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
