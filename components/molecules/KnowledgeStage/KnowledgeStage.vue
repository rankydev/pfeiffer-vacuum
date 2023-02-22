<template>
  <div class="knowledge-stage">
    <div class="knowledge-stage__inner-wrapper">
      <div class="knowledge-stage__content-block">
        <div class="knowledge-stage__headline">
          <h1>{{ headline }}</h1>
        </div>
        <div class="knowledge-stage__date">
          <div class="knowledge-stage__date-day">
            <Icon class="knowledge-stage__date-icon" icon="date_range" />
            <p>{{ $d(fixedDate, 'date') }}</p>
            <div v-if="showTime" class="knowledge-stage__date-time">
              <p class="knowledge-stage__date-divider">|</p>
              <p class="knowledge-stage__space">{{ fixedTime }}</p>
              <p>{{ $t('knowledge.time') }}</p>
            </div>
          </div>
          <div v-if="showDuration" class="knowledge-stage__date-duration">
            <Icon class="knowledge-stage__date-icon" icon="timer" />
            <p>{{ hours }}</p>
            <p class="knowledge-stage__space">{{ $t('knowledge.hours') }}</p>
            <p>{{ minutes }}</p>
            <p>{{ $t('knowledge.minutes') }}</p>
          </div>
        </div>
        <div class="knowledge-stage__summary">
          <Richtext v-if="summary" :richtext="summary" />
          <div class="knowledge-stage__button"></div>
        </div>
      </div>
      <div class="knowledge-stage__image-block">
        <ResponsiveImage
          v-if="(image || {}).originalFilename"
          :image="image"
          class="knowledge-stage__image"
          aspect-ratio="16:9"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'Stage',
  components: {
    ResponsiveImage,
    Richtext,
    Icon,
  },
  props: {
    image: {
      type: [Object, String],
      default: () => ({}),
    },
    date: {
      type: String,
      default: '',
    },
    isWhitepaper: {
      type: Boolean,
      default: false,
    },
    minutes: {
      type: String,
      default: '',
    },
    hours: {
      type: String,
      default: '',
    },
    headline: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const dateObj = new Date(props.date)
    /**
     * Workaround to make sure the date works in Safari:
     * https://stackoverflow.com/questions/4310953/invalid-date-in-safari
     */
    const fixedDate = computed(() => new Date(props.date.replace(/-/g, '/')))
    const fixedTime = ref(
      dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    )

    const showTime = computed(() => {
      if (props.isWhitepaper) {
        return false
      } else if (fixedTime.value === '00:00') {
        return false
      } else {
        return true
      }
    })

    const showDuration = computed(() => {
      if (props.isWhitepaper) {
        return false
      } else if (props.minutes === '' && props.hours === '') {
        return false
      } else {
        return true
      }
    })

    return { fixedDate, fixedTime, showTime, showDuration }
  },
})
</script>

<style lang="scss">
.knowledge-stage {
  @apply tw-bg-pv-grey-96;

  &__inner-wrapper {
    @apply tw-flex;
    @apply tw-flex-wrap-reverse;
    @apply tw-px-0;

    @screen md {
      @apply tw-flex-nowrap;
      @apply tw-flex-row;
    }
  }

  &__content-block {
    @apply tw-w-full;
    @apply tw-mx-4;
    @apply tw-my-6;

    @screen md {
      @apply tw-w-1/2;
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-my-auto;
      @apply tw-mx-6;
    }

    @screen lg {
      @apply tw-mx-8;
    }
  }

  &__headline {
    @apply tw-mb-4;
  }

  &__date {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-mb-4;

    @screen md {
      @apply tw-flex-row;
    }

    p {
      @apply tw-text-base;
      @apply tw-font-bold;
    }
  }

  &__date-day {
    @apply tw-flex;
    @apply tw-mr-8;
  }

  &__date-icon {
    @apply tw-mr-3;
  }

  &__date-time {
    @apply tw-flex;
  }

  &__date-duration {
    @apply tw-flex;
    @apply tw-mt-2;

    @screen md {
      @apply tw-mt-0;
    }
  }

  &__date-divider {
    @apply tw-text-pv-red;
    @apply tw-mx-2;
  }

  &__space {
    @apply tw-mr-1;
  }

  &__image-block {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
    }
  }

  &__button {
    @apply tw-mt-4;
  }

  &__image {
    &.responsive-image {
      img {
        @apply tw-w-full;
        @apply tw-rounded-none;
        @apply tw-object-cover;

        @screen md {
          height: 372px;
        }

        @screen lg {
          height: 400px;
        }

        @screen xl {
          // growing proportionally to width of screen
          height: 28vw;
        }
      }
    }
  }
}
</style>
