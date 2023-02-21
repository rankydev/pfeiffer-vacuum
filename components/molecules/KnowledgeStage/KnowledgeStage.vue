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
            <p>{{ $d(fixedDate, 'dateLong') }}</p>
            <div v-if="showTime" class="knowledge-stage__date-time">
              <p class="knowledge-stage__date-divider">|</p>
              <p class="knowledge-stage__space">{{ fixedTime }}</p>
              <p>{{ $t('knowledge.time') }}</p>
            </div>
          </div>
          <div v-if="showDuration" class="knowledge-stage__date-time">
            <Icon class="knowledge-stage__date-icon" icon="timer" />
            <p>{{ hours }}</p>
            <p class="knowledge-stage__space">{{ $t('knowledge.hours') }}</p>
            <p>{{ minutes }}</p>
            <p>{{ $t('knowledge.minutes') }}</p>
          </div>
        </div>
        <div class="knowledge-stage__summary">
          <Richtext v-if="summary" :richtext="summary" />
          <div v-if="button.length" class="knowledge-stage__button">
            <!-- <KnowledgeAssetButton v-for="btn in button" :key="btn._uid" /> -->
            <KnowledgeAssetButton
              id="123"
              type="WEBINAR"
              :date="date"
              asset-url="https://www.google.com"
              :is-detail-page="false"
            />
            <!-- <Button
              v-for="btn in button"
              :key="btn._uid"
              v-bind="btn"
              @click="openModal"
            /> -->
          </div>
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
// import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon'
import KnowledgeAssetButton from '~/components/molecules/KnowledgeAssetButton/KnowledgeAssetButton.vue'

export default defineComponent({
  name: 'KnowledgeStage',
  components: {
    ResponsiveImage,
    Richtext,
    // Button,
    Icon,
    KnowledgeAssetButton,
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
    button: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const dateObj = new Date(props.date)
    const isOpen = ref(false)
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

    const openModal = () => {
      isOpen.value = true
    }

    const closeModal = () => {
      isOpen.value = false
    }

    return {
      fixedDate,
      fixedTime,
      showTime,
      showDuration,
      openModal,
      closeModal,
    }
  },
})
</script>

<style lang="scss">
.knowledge-stage {
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
    @apply tw-mb-4;

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
