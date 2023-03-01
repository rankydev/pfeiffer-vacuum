<template>
  <div class="knowledge-author">
    <ResponsiveImage
      class="knowledge-author__image"
      :image="image"
      aspect-ratio="1:1"
      :rounded="false"
    />
    <p class="knowledge-author__description">
      <span class="knowledge-author__name">{{ name }}</span>
      <span class="knowledge-author__title">{{ title }}</span>
    </p>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  name: 'KnowledgeAuthor',
  components: { ResponsiveImage },
  props: {
    image: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss">
.knowledge-author {
  @apply tw-flex;
  @apply tw-mb-6;
  @apply tw-pr-2;

  @screen md {
    @apply tw-pr-4;
  }

  @screen lg {
    @apply tw-mb-4;
  }

  &__image {
    @apply tw-mr-4;
    @apply tw-rounded;
    @apply tw-w-20;
    @apply tw-h-20;

    img {
      @apply tw-rounded;
    }
  }

  &__description {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-flex-col;
  }

  &__name {
    @apply tw-font-bold;
    @apply tw-text-base;

    @screen lg {
      @apply tw-text-lg;
    }
  }

  &__title {
    @apply tw-text-pv-grey-64;
    @apply tw-text-sm;

    @screen lg {
      @apply tw-text-base;
    }
  }
}
</style>
