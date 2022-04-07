<template>
  <div
    v-editable="(image, variant, imagePosition, stageContent)"
    class="stage"
    :class="imagePosition === 'left' ? 'stage--reverse' : ''"
  >
    <StageContent
      v-if="variant !== 'fullImage'"
      class="stage__content-block"
      v-bind="stageContent[0]"
    />
    <NuxtImg
      v-if="(image || {}).originalFilename"
      preload
      class="stage__image"
      :class="{
        'stage__image--with-text': variant === 'withText',
        'stage__image--full': variant === 'fullImage',
      }"
      :alt="image.alt"
      :src="image.originalFilename"
    />
  </div>
</template>

<script>
import StageContent from '@/components/molecules/Stage/StageContent/StageContent'

export default {
  name: 'Stage',
  components: {
    StageContent,
  },
  props: {
    variant: {
      type: String,
      default: 'fullImage',
      validator: (val) => ['fullImage', 'withText'].includes(val),
    },
    image: {
      type: [Object, String],
      default: () => ({}),
    },
    imagePosition: {
      type: String,
      default: 'right',
      validator: (val) => ['right', 'left'].includes(val),
    },
    stageContent: {
      type: Array,
      default: () => [],
    },
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
    @apply tw-flex-row;

    &--reverse {
      @apply tw-flex-row-reverse;
    }
  }

  &__content-block {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
    }
  }

  &__image-block {
    @apply tw-basis-full;

    @screen md {
      @apply tw-basis-6/12;
      width: var(--image-max-width);
    }

    }

    img {
    &--with-text {
      @apply tw-w-full;
      height: 180px;
      object-fit: cover;

      @screen md {
        height: 372px;
        object-fit: var(--object-fit);
        @apply tw-w-1/2;
      }
    }

    &--full {
      @apply tw-w-full;
      @apply tw-object-cover;
    }
  }
}
</style>
