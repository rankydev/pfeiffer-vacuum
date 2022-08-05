<template>
  <div class="help-container tw-grid-container tw-my-component-wide">
    <div class="help-container__content">
      <h2 class="help-container__headline">{{ headline }}</h2>
      <h3 class="help-container__subline">{{ subline }}</h3>
      <Richtext :richtext="enrichedRichtext" class="help-container__richtext" />
      <div class="help-container__buttons">
        <NuxtDynamic
          v-for="item in buttons"
          :key="item._uid"
          class="help-container__button"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </div>
    </div>
    <div class="help-container__media">
      <Icon :icon="icon" size="xlarge" />
      <!-- <NuxtDynamic
        v-for="item in media"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      /> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
// import { renderHeadline, renderSubline } from '~/utils/richtext'

export default defineComponent({
  components: { Richtext, Icon },
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
    icon: {
      type: String,
      default: 'contact_support',
    },
    /**
     * Media item which will be rendered beside
     */
    // media: {
    //   type: Array,
    //   default: () => [],
    // },
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
    // const getClass = (props, type) => {
    //   const ratios = props.ratio.split('/')
    //   const orders = props.order.split('/')
    //   const index = orders.findIndex((val) => val === type)
    //   const order = index === 0 ? 'first' : 'last'
    //   return [
    //     `help-container__${type}--${ratios[index]}`,
    //     `help-container__${type}--${order}`,
    //   ]
    // }

    // const contentClass = computed(() => getClass(props, 'content'))
    // const mediaClass = computed(() => getClass(props, 'media'))

    const enrichedRichtext = computed(() =>
      [
        // props.headline ? renderHeadline(props.headline, 2) : '',
        // props.subline ? renderSubline(props.subline, 3) : '',
        props.richtext,
      ].join('')
    )

    return { enrichedRichtext }
  },
})
</script>

<style lang="scss">
.help-container {
  @apply tw-items-center;
  @apply tw-bg-pv-grey-32;
  @apply tw-rounded-lg;
  @apply tw-text-pv-white;

  &__headline {
    @apply tw-text-pv-white;
  }

  &__subline {
    @apply tw-text-pv-white;
  }

  &__content {
    @apply tw-p-12;
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-6;
    }

    @screen lg {
      @apply tw-col-span-9;
    }
  }

  &__media {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-bg-pv-red;
    @apply tw-h-full;
    @apply tw-rounded-r-lg;

    @screen md {
      @apply tw-col-span-2;
    }

    @screen lg {
      @apply tw-col-span-3;
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
