<template>
  <div class="video-player">
    <div class="video-player__inner" @click.once="isActivated = true">
      <template v-if="!isActivated">
        <picture>
          <source
            v-for="(source, idx) in sources || []"
            :key="idx"
            v-bind="source"
          />
          <img class="video-player__preview" :src="image" :alt="title" />
        </picture>

        <button class="video-player__button">
          <Icon
            class="video-player__icon"
            :class="`video-player__icon--${icon}`"
            :icon="icon"
            type="svg"
            size="large"
          />
        </button>
      </template>

      <template v-else>
        <iframe
          :title="title"
          class="video-player__embed"
          v-bind="iframeAttributes"
        />
      </template>
    </div>
    <NuxtDynamic
      v-for="item in description"
      :key="item._uid"
      v-editable="item"
      class="video-player__component"
      v-bind="item"
      :component="item.uiComponent || item.component"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  watch,
  reactive,
  unref,
} from '@nuxtjs/composition-api'
import { useYoutube } from './composables/youtube.js'

const DEFAULT_DATA = {
  image:
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  icon: '',
  sources: [],
  iframeAttributes: {},
}

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Video player',
    },
    description: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const result = reactive({
      isActivated: false,
      ...DEFAULT_DATA,
    })

    const youtube = useYoutube()

    const updateData = (url) => {
      youtube.setUrl(url)

      const data = unref(youtube.hasId) && youtube.data
      const getData = (i) => unref(data[i]) || DEFAULT_DATA[i]
      const replaceData = (i) => (result[i] = getData(i))
      Object.keys(DEFAULT_DATA).forEach(replaceData)
    }

    watch(() => props.url, updateData, { immediate: true })

    return result
  },
})
</script>

<style lang="scss">
.video-player {
  &__inner {
    @apply tw-relative;
    @apply tw-cursor-pointer;
    @apply tw-rounded-lg;
    @apply tw-overflow-hidden;
    padding-bottom: calc(9 / 16 * 100%);
  }

  &__embed,
  &__preview {
    @apply tw-absolute;
    @apply tw-inset-0;
    @apply tw-border-none;
    @apply tw-w-full;
    @apply tw-h-full;
  }

  &__preview {
    @apply tw-object-cover;
    @apply tw-ease-linear;
    @apply tw-duration-100;
  }

  &__icon {
    @apply tw-duration-200;
    @apply tw-ease-in-out;

    &--youtube {
      @apply tw-text-pv-grey-16/80;
    }
  }

  &__button {
    @apply tw-absolute;
    @apply tw-top-1/2;
    @apply tw-left-1/2;
    @apply tw--translate-x-1/2;
    @apply tw--translate-y-1/2;
  }

  &__component {
    @apply tw-mt-2;
  }

  &__inner:hover,
  &__button:focus {
    @apply tw-outline-none;

    & .video-player {
      &__preview {
        @apply tw-scale-105;
      }

      &__icon--youtube {
        color: #f00;
      }
    }
  }
}
</style>
