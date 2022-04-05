<template>
  <div class="content-media-block tw-grid-container">
    <div class="content-media-block__content" :class="contentClass">
      <Richtext
        :richtext="enrichedRichtext"
        class="content-media-block__richtext"
      />
      <div class="content-media-block__buttons">
        <NuxtDynamic
          v-for="item in buttons"
          :key="item._uid"
          class="content-media-block__button"
          v-bind="item"
          :component="item.uiComponent || item.component"
        />
      </div>
    </div>
    <NuxtDynamic
      v-for="item in media"
      :key="item._uid"
      class="content-media-block__media"
      :class="mediaClass"
      v-bind="item"
      :component="item.uiComponent || item.component"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  components: { Richtext },
  props: {
    /**
     * title of the media element rendred as h2
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * subtitle which will be rendered underneath
     */
    subTitle: {
      type: String,
      default: '',
    },
    /**
     * richtext element
     */
    richtext: {
      type: String,
      default: '',
    },
    /**
     * buttons appended to the richtext
     */
    buttons: {
      type: Array,
      default: () => [],
    },
    /**
     * Media item which will be rendered beside
     */
    media: {
      type: Array,
      default: () => [],
    },
    /**
     * Aspect ratio between both elements
     */
    ratio: {
      type: String,
      default: 'half/half',
      validator: (val) => ['half/half', 'one/three', 'three/one'].includes(val),
    },
    /**
     * sort order of text and media item
     */
    order: {
      type: String,
      default: 'content/media',
      validator: (val) => ['content/media', 'media/content'].includes(val),
    },
  },

  setup(props) {
    const getClass = (type) => {
      const ratios = props.ratio.split('/')
      const orders = props.order.split('/')
      const index = orders.findIndex((val) => val === type)
      const order = index === 0 ? 'first' : 'last'
      return [
        `content-media-block--${ratios[index]}`,
        `content-media-block--${order}`,
      ]
    }

    const contentClass = computed(() => getClass('content'))
    const mediaClass = computed(() => getClass('media'))

    const getSublineHtml = (text) =>
      `<p><span class="tw-subline tw-subline-3">${text}</span></p>`

    const enrichedRichtext = computed(() =>
      [
        ...(props.title ? [`<h2>${props.title}</h2>`] : []),
        ...(props.subTitle ? [getSublineHtml(props.subTitle)] : []),
        props.richtext,
      ].join('')
    )

    return { contentClass, mediaClass, enrichedRichtext }
  },
})
</script>

<style lang="scss">
.content-media-block {
  @apply tw-items-center;

  &__content,
  &__media {
    @apply tw-col-span-full;
  }

  &__buttons {
    @apply tw-mt-4;
    @apply tw-flex tw-flex-wrap;
    @apply tw-gap-x-6 tw-gap-y-4;
  }

  &__button {
    @apply tw-basis-full;

    @screen md {
      @apply tw-basis-0;
    }
  }

  &--first {
    @apply tw-order-first;
  }

  @screen md {
    &--half {
      @apply tw-col-span-4;
    }

    &--one:not(.content-media-block__content) {
      @apply tw-col-span-3;
    }

    &--three:not(.content-media-block__media) {
      @apply tw-col-span-5;
    }
  }

  @screen lg {
    &--half {
      @apply tw-col-span-6;
    }

    &--one {
      @apply tw-col-span-4;
    }

    &--three {
      @apply tw-col-span-8;
    }
  }
}
</style>
