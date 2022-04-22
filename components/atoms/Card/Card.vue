<template>
  <div class="card">
    <nuxt-link :to="to">
      <div class="card__img-container">
        <slot name="image"></slot>
      </div>
      <div class="card__text-container">
        <div class="card__category card__small-text">
          <slot name="category"></slot>
        </div>
        <h3 class="card__title">
          <slot name="title"></slot>
        </h3>
        <p class="card__description">
          <slot name="description"></slot>
        </p>
      </div>
    </nuxt-link>

    <div class="card__text-container">
      <div
        v-if="hasSlot('additionalInformation')"
        class="card__additional-information card__small-text"
      >
        <slot name="additionalInformation"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Card',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    console.log('###', slots)
    const hasSlot = (name) => !!slots[name]
    return { hasSlot }
  },
})
</script>
<style lang="scss">
.card {
  @apply tw-bg-pv-white;
  @apply tw-flex tw-flex-col;
  @apply tw-h-full;
  @apply tw-shadow-card;
  @apply tw-border-2;
  @apply tw-border-pv-grey-96;
  @apply tw-rounded-md;
  @apply tw-overflow-hidden;
  max-width: 229px;

  @screen md {
    max-width: 332px;
  }

  &__img-container {
    @apply tw-bg-pv-red-darker;
    @apply tw-w-full;
    padding-bottom: calc(100% / (16 / 9));
  }

  &__text-container {
    @apply tw-px-4 tw-py-6;
  }

  &__small-text {
    @apply tw-text-xs;
    @apply tw-text-pv-grey-16;
  }

  &__title {
    @apply tw-text-base;
    @apply tw-font-bold;

    @screen md {
      @apply tw-text-xl;
    }
  }

  &__description {
    @apply tw-text-xs;
  }
}
</style>
