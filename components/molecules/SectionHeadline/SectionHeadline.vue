<template>
  <div class="section-headline">
    <h3 class="section-headline__text"><slot /></h3>
    <div class="section-headline__buttons">
      <Button
        v-for="(btn, index) in buttons"
        :key="index"
        :class="[
          'section-headline__buttons',
          {
            'section-headline__buttons--desktop': btn.desktopOnly,
            'section-headline__buttons--mobile': btn.mobileOnly,
          },
        ]"
        v-bind="btn"
        @click="$emit('btnClick', index)"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SectionHeadline',
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['btnClick'],
})
</script>
<style lang="scss">
.section-headline {
  @apply tw-flex tw-justify-between tw-items-center;
  @apply tw-w-full;

  &__buttons {
    @apply tw-flex;
    @apply tw-gap-4;

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
