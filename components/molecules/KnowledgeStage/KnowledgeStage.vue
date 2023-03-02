<template>
  <div class="knowledge-stage">
    <div class="knowledge-stage__inner-wrapper">
      <div class="knowledge-stage__content-block">
        <div class="knowledge-stage__headline">
          <h1>{{ headline }}</h1>
        </div>
        <div class="knowledge-stage__date">
          <div v-if="showDate" class="knowledge-stage__date-day">
            <Icon class="knowledge-stage__date-icon" icon="date_range" />
            <p>{{ fixedDate }}</p>
            <div v-if="!isWhitepaper" class="knowledge-stage__date-time">
              <p class="knowledge-stage__date-divider">|</p>
              <p class="knowledge-stage__space">
                {{ fixedTime }} {{ $t('knowledge.time') }}
              </p>
            </div>
          </div>
          <div v-if="showDuration" class="knowledge-stage__date-duration">
            <Icon class="knowledge-stage__date-icon" icon="timer" />
            <p>{{ duration }}</p>
          </div>
        </div>
        <div class="knowledge-stage__summary">
          <p>{{ summary }}</p>
          <div class="knowledge-stage__button">
            <div class="knowledge-stage__button">
              <KnowledgeAssetButton
                :type="isWhitepaper ? 'WHITEPAPER' : 'WEBINAR'"
                :webinar-registration-id="webinarRegistrationId"
                date
                :asset-url="assetUrl"
                :is-detail-page="isDetailPage"
                @openModal="toggleModal(true)"
              />
            </div>
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
    <KnowledgeModal :is-open="isModalOpen" @closeModal="toggleModal(false)" />
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  useContext,
  ref,
} from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Icon from '~/components/atoms/Icon/Icon'
import KnowledgeAssetButton from '~/components/molecules/KnowledgeAssetButton/KnowledgeAssetButton.vue'
import KnowledgeModal from '~/components/molecules/KnowledgeModal/KnowledgeModal'

export default defineComponent({
  name: 'KnowledgeStage',
  components: {
    ResponsiveImage,
    Icon,
    KnowledgeAssetButton,
    KnowledgeModal,
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
    webinarRegistrationId: {
      type: String,
      default: null,
    },
    assetUrl: {
      type: String,
      default: null,
    },
    isDetailPage: {
      type: Boolean,
      default: false,
    },
    duration: {
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
    const { i18n } = useContext()

    const isModalOpen = ref(false)

    const isValidDate = (d) => d instanceof Date && !isNaN(d)

    const dateObj = computed(() => new Date(props.date))
    const fixedDate = computed(() =>
      isValidDate(dateObj.value) ? i18n.d(dateObj.value, 'date') : ''
    )
    const fixedTime = computed(() =>
      isValidDate(dateObj.value) ? i18n.d(dateObj.value, 'time') : ''
    )

    const showTime = computed(() => !props.isWhitepaper)
    const showDuration = computed(
      () => !!(!props.isWhitepaper || props.duration !== '')
    )
    const showDate = computed(() => !!(props.fixedDate !== ''))

    const toggleModal = (state) => (isModalOpen.value = state)

    return {
      fixedDate,
      fixedTime,
      showTime,
      showDuration,
      showDate,
      dateObj,
      isModalOpen,

      toggleModal,
    }
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
    @apply tw-text-pv-grey-16;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-mb-4;

    @screen md {
      @apply tw-flex-row;
    }

    p {
      @apply tw-text-sm;
      @apply tw-font-bold;

      @screen lg {
        @apply tw-text-base;
      }
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

  &__summary {
    p {
      @apply tw-text-base;

      @screen lg {
        @apply tw-text-xl;
        @apply tw-leading-7;
      }
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
