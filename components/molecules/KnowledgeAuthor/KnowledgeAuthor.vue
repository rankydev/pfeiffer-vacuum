<template>
  <li class="knowledge-author">
    <!-- <img :src="image" /> -->
    <ResponsiveImage
      class="knowledge-author__image"
      :image="image"
      aspect-ratio="1:1"
      :rounded="true"
    />
    <p class="knowledge-author__description">
      <span class="knowledge-author__name">{{ name }}</span>
      <span class="knowledge-author__title">{{ title }}</span>
    </p>
  </li>
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
  @apply tw-mb-4;
  @apply tw-pr-4;
  @apply tw-bg-pv-grey-96;

  &__image {
    @apply tw-mr-4;
    width: 80px;
    height: 80px;
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
      @apply tw-text-xl;
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
