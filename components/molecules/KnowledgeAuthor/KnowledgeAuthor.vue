<template>
  <li class="knowledge-author">
    <img :src="image.filename" />
    <p class="knowledge-author__description">
      <span class="knowledge-author__name">{{ name }}</span>
      <span class="knowledge-author__title">{{ title }}</span>
    </p>
  </li>
</template>

<script>
export default {
  name: 'KnowledgeAuthor',
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
}
</script>

<style lang="scss">
.knowledge-author {
  @apply tw-flex;
  @apply tw-mb-4;

  img {
    @apply tw-mr-4;

    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__description {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-flex-col;
  }

  &__name {
    @apply tw-font-bold;
  }

  &__title {
    @apply tw-text-pv-grey-64;
  }
}
</style>
