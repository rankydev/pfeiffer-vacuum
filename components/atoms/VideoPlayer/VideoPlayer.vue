<template>
  <div class="video-player" @click.once="isActivated = true">
    <template v-if="!isActivated">
      <picture>
        <source
          :srcset="`https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`"
          type="image/webp"
        />
        <img
          class="video-player__preview"
          :src="`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`"
          :alt="title"
        />
      </picture>

      <button class="video-player__button">
        <svg viewBox="0 0 68 48">
          <path
            class="video-player__button-shape"
            d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6c-3 .7-4.6 3.2-5.4 6.1a89.6 89.6 0 0 0 0 32.5c.8 3 2.5 5.5 5.4 6.3C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c3-.7 4.6-3.2 5.4-6.1C68 35 68 24 68 24s0-11-1.5-16.3z"
          />
          <path class="video-player__button-icon" d="M45 24L27 14v20" />
        </svg>
      </button>
    </template>

    <template v-else>
      <iframe
        :title="title"
        class="video-player__embed"
        :src="`https://www.youtube.com/embed/${id}?autoplay=1`"
        v-bind="iframeAttributes"
      />
    </template>
    <NuxtDynamic
      v-for="item in description"
      :key="item._uid"
      v-editable="item"
      :name="item.uiComponent || item.component"
      v-bind="item"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import getYouTubeID from 'get-youtube-id'

const PLAYER_SCRIPT_SRC = 'https://www.youtube.com/player_api'

const DEFAULT_IFRAME_ATTRIBUTES = {
  allowfullscreen: true,
  frameborder: 0,
  allow: [
    'accelerometer',
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture',
  ].join('; '),
}

export default defineComponent({
  props: {
    src: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'YouTube video player',
    },
    description: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const isActivated = ref(false)

    const id = computed(() => getYouTubeID(props.src) || '')

    const iframeAttributes = computed(() => {
      const hasQuestionMark = props.src.indexOf('?') !== -1
      const query = ['autoplay=1', 'showinfo=0']
      const divider = hasQuestionMark ? '&' : '?'

      return {
        // src: `${props.src}${divider}${query.join('&')}`,
        ...DEFAULT_IFRAME_ATTRIBUTES,
      }
    })

    return { isActivated, id, iframeAttributes }
  },
})
</script>

<style lang="scss">
.video-player {
  background-color: #000;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: calc(9 / 16 * 100%);

  &__embed,
  &__preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-width: 0;
  }

  &__preview {
    object-fit: cover;
  }

  &__button-shape {
    fill: #212121;
    fill-opacity: 0.8;
  }

  &__button-icon {
    fill: #fff;
  }

  &__button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    border-width: 0;
    background-color: transparent;
    width: 68px;
    height: 48px;
    cursor: pointer;

    &:focus,
    &:hover {
      outline: 0;

      & .video-player__button-shape {
        fill: red;
        fill-opacity: 1;
      }
    }
  }
}
</style>
