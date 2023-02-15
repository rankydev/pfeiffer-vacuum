<template>
  <div v-editable="(image, stageContent)" class="stage">
    <div class="stage__inner-wrapper">
      <div class="stage__content-block">
        <div class="stage__date tw-flex">
          <div class="stage__date-day tw-flex tw-mr-8">
            <Icon class="tw-text-pv-white tw-mr-3" icon="date_range" />
            <p class="tw-text-pv-white">{{ $d(fixedDate, 'dateLong') }}</p>
            <p class="tw-text-pv-red tw-mx-2">|</p>
            <p class="tw-text-pv-white">{{ fixedTime }}</p>
            <p class="tw-text-pv-white">{{ $t('knowledge.minutes') }}</p>
          </div>
          <div class="tw-flex tw-text-pv-white">
            <Icon class="tw-text-pv-white tw-mr-3" icon="timer" />
            <p class="tw-text-pv-white">{{ hours }}</p>
            <p class="tw-text-pv-white">:</p>
            <p class="tw-text-pv-white">{{ minutes }}</p>
          </div>
        </div>
        <div class="stage__content">
          <h1>{{ headline }}</h1>
          <Richtext
            v-if="description"
            :richtext="description"
            class="stage-content__description"
          />
          <div v-if="button.length" class="stage-content__buttons">
            <Button
              v-for="btn in button"
              :key="btn._uid"
              class="stage-content__button"
              v-bind="btn"
            />
          </div>
        </div>
      </div>
      <ResponsiveImage
        v-if="(image || {}).originalFilename"
        :image="image"
        class="stage__image"
        :class="`stage__image--${stageContent.length ? 'with-text' : 'full'}`"
        aspect-ratio="16:9"
      />
    </div>
  </div>
</template>

<script>
// import StageContent from '~/components/molecules/Stage/StageContent/StageContent.vue'
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'Stage',
  components: {
    // StageContent,
    ResponsiveImage,
    Richtext,
    Button,
    Icon,
  },
  props: {
    /**
     * An image wich if displayed full width if no stage content is defined.
     * If a stage content is defined it is displayed on the right side
     */
    image: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
     * The stage content which can be added optionally
     */
    stageContent: {
      type: Array,
      default: () => [],
    },
    date: {
      type: String,
      default: '',
    },
    minutes: {
      type: String,
      default: '',
    },
    hours: {
      type: String,
      default: '',
    },
    /**
     * The headline of the stage
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * description text of the stage
     */
    description: {
      type: String,
      default: '',
    },
    /**
     * button
     */
    button: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const dateObj = new Date(props.date)
    /**
     * Workaround to make sure the date works in Safari:
     * https://stackoverflow.com/questions/4310953/invalid-date-in-safari
     */
    const fixedDate = computed(() => new Date(props.date.replace(/-/g, '/')))
    const fixedTime = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    if (fixedDate === '00:00') {
      console.log('remove')
    }

    return { fixedDate, fixedTime }
  },
})
</script>

<style lang="scss">
.stage {
  @apply tw-mt-48;

  &__inner-wrapper {
    @apply tw-flex;
    @apply tw-flex-wrap-reverse;
    @apply tw-px-0;

    h1 {
      @apply tw-text-pv-white;
    }

    h4 {
      @apply tw-text-pv-white;
    }

    @screen md {
      @apply tw-flex-nowrap;
      @apply tw-flex-row;
    }
  }

  &__content-block {
    @apply tw-w-full;
    @apply tw-mx-4;

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

  &__image {
    &--with-text {
      @apply tw-w-full;
      @apply tw-object-cover;

      @screen md {
        @apply tw-w-1/2;
        @apply tw-object-contain;
      }
    }

    &--full {
      @apply tw-w-full;
      @apply tw-object-cover;
    }

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
