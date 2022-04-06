<template>
  <div
    v-editable="(image, variant, imagePosition, stageContent)"
    class="stage"
    :style="cssVars"
  >
    <StageContent
      v-if="displayStageContent"
      class="stage__content-block"
      :headline="headline"
      :subline="subline"
      :teaser-text="teaserText"
      :buttons="buttons"
    />
    <div class="stage__image-block">
      <NuxtImg preload :alt="image.alt" :src="image.originalFilename" />
    </div>
  </div>
</template>

<script>
import StageContent from '@/components/molecules/Stage/StageContent/StageContent'
import { computed, toRefs } from '@nuxtjs/composition-api'

export default {
  name: 'Stage',
  components: {
    StageContent,
  },
  props: {
    variant: {
      type: String,
      default: 'fullImage',
      required: true,
    },
    image: {
      type: Object,
      default: () => {},
      required: true,
    },
    imagePosition: {
      type: String,
      default: 'right',
    },
    stageContent: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { variant, stageContent, imagePosition } = toRefs(props)

    const displayStageContent = !(variant.value === 'fullImage')

    const cssVars = computed(() => {
      if (displayStageContent) {
        if (imagePosition.value === 'left') {
          return {
            '--object-fit': 'contain',
            '--image-max-width': '50%',
            '--stage-flex-direction': 'row-reverse',
          }
        }
        return {
          '--object-fit': 'contain',
          '--image-max-width': '50%',
          '--stage-flex-direction': 'row',
        }
      }
      return {
        '--object-fit': 'cover',
        '--image-max-width': '100vw',
        '--stage-flex-direction': 'row',
      }
    })

    const { headline, subline, teaserText, buttons } = stageContent.value[0]

    return {
      displayStageContent,
      cssVars,
      headline,
      subline,
      teaserText,
      buttons,
    }
  },
}
</script>

<style lang="scss">
.stage {
  @apply tw-flex;
  @apply tw-flex-wrap-reverse;
  @apply tw-bg-pv-grey-16;

  @screen md {
    @apply tw-flex-nowrap;
    flex-direction: var(--stage-flex-direction);
  }

  &__content-block {
    @apply tw-basis-full;

    @screen md {
      @apply tw-basis-6/12;
      width: 50%;
    }
  }

  &__image-block {
    @apply tw-basis-full;

    @screen md {
      @apply tw-basis-6/12;
      width: var(--image-max-width);
    }

    img {
      @apply tw-w-full;
      height: 180px;
      object-fit: cover;

      @screen md {
        height: 372px;
        object-fit: var(--object-fit);
      }

      @screen lg {
        height: 400px;
      }
    }
  }
}
</style>
