<template>
  <div class="content-media-block tw-grid-container tw-my-component-wide">
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
          :name="item.uiComponent || item.component"
        />
      </div>
    </div>
    <div class="content-media-block__media" :class="mediaClass">
      <NuxtDynamic
        v-for="item in media"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import { renderHeadline, renderSubline } from '~/utils/richtext'

export default defineComponent({
  components: { Richtext },
  props: {
    /**
     * headline of the media element rendred as h2
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * subline which will be rendered underneath the headline
     */
    subline: {
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
        `content-media-block__${type}--${ratios[index]}`,
        `content-media-block__${type}--${order}`,
      ]
    }

    const contentClass = computed(() => getClass('content'))
    const mediaClass = computed(() => getClass('media'))

    const enrichedRichtext = computed(() =>
      [
        props.headline ? renderHeadline(props.headline, 2) : '',
        props.subline ? renderSubline(props.subline, 3) : '',
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

  &__content {
    &--three {
      @apply tw-col-span-5;
    }
  }

  &__media {
    &--one {
      @apply tw-col-span-3;
    }
  }

  &__content,
  &__media {
    @apply tw-col-span-full;

    @screen md {
      &--half {
        @apply tw-col-span-4;
      }

      &--one {
        @apply tw-col-span-3;
      }

      &--three {
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

    &--first {
      @apply tw-order-first;
    }
  }

  &__buttons {
    @apply tw-mt-4;
    @apply tw-flex tw-flex-wrap;
    @apply tw-gap-x-6 tw-gap-y-4;
  }

  &__button {
    @apply tw-basis-full;

    &:nth-child(2) {
      @apply tw-justify-start;
    }

    @screen md {
      @apply tw-basis-0;
    }
  }
}
</style>
