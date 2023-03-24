<template>
  <div class="contact-cta-box">
    <h4 class="contact-cta-box__headline">{{ headline }}</h4>
    <NuxtDynamic
      v-for="item in description"
      :key="item._uid"
      class="contact-cta-box__description"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
    <NuxtDynamic
      v-for="item in button"
      :key="item._uid"
      class="contact-cta-box__button"
      v-bind="item"
      :name="item.uiComponent || item.component"
      @click="$emit('click')"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentCTABox',
  props: {
    headline: {
      type: String,
      default: '',
    },
    description: {
      type: Array,
      default: () => [],
    },
    button: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['click'],
})
</script>
<style lang="scss">
.contact-cta-box {
  @apply tw-bg-pv-grey-96;
  @apply tw-p-6;
  @apply tw-rounded-md;

  &__headline,
  &__description {
    @apply tw-mb-4;
    @apply tw-leading-6;
    @apply tw-text-pv-grey-16;
  }

  &__description {
    @screen lg {
      @apply tw-text-base;
    }
  }

  &__button {
    .link {
      @apply tw-flex;
      @apply tw-gap-x-4;
    }
  }
}
</style>
