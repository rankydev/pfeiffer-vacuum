<template>
  <div
    v-editable="(headline, subline, teaserText, buttons)"
    class="stage-content"
  >
    <h1 class="stage-content__headline">{{ headline }}</h1>
    <p class="stage-content__subline tw-teaser">{{ subline }}</p>
    <p class="stage-content__description tw-paragraph">{{ teaserText }}</p>
    <Button
      v-for="button in buttons"
      :key="button._uid"
      class="stage-content__button"
      v-bind="button"
    />
  </div>
</template>

<script>
export default {
  name: 'StageContent',
  props: {
    headline: {
      type: String,
      default: '',
    },
    subline: {
      type: String,
      default: '',
    },
    teaserText: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.stage-content {
  @apply tw-bg-pv-grey-16;
  @apply tw-px-8;
  @apply tw-py-6;
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-justify-center;

  &__headline,
  &__subline,
  &__description {
    @apply tw-text-pv-white;
  }

  &__headline,
  &__subline {
    @apply tw-mb-2;
  }

  &__description {
    @apply tw-mb-8;
  }

  &__button {
    @apply tw-w-fit;
    @apply tw-mb-4;

    &:last-child {
      @apply tw-m-0;
    }
  }
}
</style>
