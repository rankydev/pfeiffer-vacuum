<template>
  <div class="sticky-bar">
    <div class="sticky-bar__content">
      <slot />
      <Button
        class="sticky-bar__btn-icon"
        variant="secondary"
        :icon="icon"
        :href="href"
        :target="target"
        cutaway="bottom"
      />
      <Button
        class="sticky-bar__btn-full"
        :label="label"
        variant="secondary"
        :icon="icon"
        :href="href"
        :target="target"
        cutaway="bottom"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'

export default defineComponent({
  components: {
    Button,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    /**
     * The icon displayed at the button
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * Defines button link if needed
     */
    href: {
      type: String,
      default: '',
    },
    /**
     * Target can be defined for button link
     * @values _self, _blank
     */
    target: {
      type: String,
      default: '_self',
      validator: (val) => ['_self', '_blank'].includes(val),
    },
  },
})
</script>

<style lang="scss">
.sticky-bar {
  @apply tw-relative;
  @apply tw-flex;
  @apply tw-justify-end;

  &__content {
    @apply tw-items-end;
    @apply tw-fixed;
    @apply tw-flex;
    @apply tw-gap-4;
    @apply tw-mr-4;
    bottom: 0;
    z-index: 100;

    @screen md {
      @apply tw-mr-6;
    }

    @screen lg {
      @apply tw-mr-8;
    }
  }

  &__btn-shop {
    @apply tw-mr-2;
  }

  &__btn-icon {
    @apply tw-flex;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__btn-full {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
    }
  }
}
</style>
