<template>
  <div class="section-headline">
    <h3 class="section-headline__text"><slot /></h3>
    <div class="section-headline__buttons">
      <Button
        v-for="(btn, index) in buttons"
        :key="index"
        class="section-headline__buttons--desktop"
        v-bind="{ ...btn }"
      />
      <Button
        v-if="mobileLink"
        icon="arrow_forward"
        variant="secondary"
        shape="plain"
        class="section-headline__buttons--mobile"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionHeadline',
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    mobileLink: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
.section-headline {
  @apply tw-flex tw-justify-between tw-items-center;
  @apply tw-w-full;

  &__buttons {
    @apply tw-flex;
    @apply tw-gap-8;

    &--desktop {
      @apply tw-hidden;

      @screen md {
        @apply tw-flex;
      }
    }

    &--mobile {
      @apply tw-flex;

      @screen md {
        @apply tw-hidden;
      }
    }
  }
}
</style>
