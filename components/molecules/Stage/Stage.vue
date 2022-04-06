<template>
  <div class="stage" :style="cssVars">
    <StageContent
      v-if="displayStageContent"
      class="stage__contentBlock"
      :headline="headline"
      :subline="subline"
      :teaser-text="teaserText"
      :buttons="buttons"
    />
    <div class="stage__imageBlock">
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
    },
    image: {
      type: Object,
      default: () => {},
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

<style lang="scss" scoped>
.stage {
  @apply tw-flex;
  @apply tw-basis-6/12;
  @apply tw-bg-pv-grey-16;
  flex-direction: var(--stage-flex-direction);

  &__contentBlock {
    width: 50%;
  }

  &__imageBlock {
    width: var(--image-max-width);

    img {
      @apply tw-w-full;
      height: 180px;
      object-fit: var(--object-fit);

      @screen md {
        height: 372px;
      }

      @screen lg {
        height: 400px;
      }
    }
  }
}
</style>
