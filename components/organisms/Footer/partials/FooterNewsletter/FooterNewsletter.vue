<template>
  <div v-editable="(headline, richtext, button)" class="newsletter">
    <h2 v-if="headline" class="newsletter__headline">
      {{ headline }}
    </h2>

    <Richtext :richtext="richtext" class="newsletter__description" />

    <div v-if="button.length">
      <Button v-for="btn in button" :key="btn._uid" v-bind="btn" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  name: 'FooterNewsletter',
  components: { Richtext },
  props: {
    /**
     * This is a headline
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * richtext element
     */
    richtext: {
      type: String,
      default: '',
    },
    /**
     * This is a button
     */
    button: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.newsletter {
  @apply tw-col-span-full;

  @screen lg {
    @apply tw-col-span-4;
  }

  &__headline {
    @apply tw-text-pv-white;
    @apply tw-pb-2;
    @apply tw-text-base;
    @apply tw-leading-6;

    @screen lg {
      @apply tw-text-xl;
      @apply tw-leading-7;
      @apply tw-pb-4;
    }
  }

  &__description {
    @apply tw-pb-2;
    @apply tw-text-sm;

    @screen lg {
      @apply tw-text-base;
      @apply tw-pb-4;
    }
  }
}
</style>
