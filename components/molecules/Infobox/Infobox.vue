<template>
  <div class="infobox">
    <div class="infobox__content">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="infobox__content__text" v-html="sanitizer.block(text)" />
    </div>
    <div class="infobox__media">
      <Icon icon="info" size="large" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'

export default defineComponent({
  name: 'Infobox',
  components: { Icon },
  props: {
    /*
     * text which will be shown in infobox
     * e.g. $t('registration.infotext')
     */
    text: {
      type: String,
      default: '',
    },
  },
  setup() {
    const sanitizer = useSanitizer()

    return {
      sanitizer,
    }
  },
})
</script>

<style lang="scss">
.infobox {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-md;
  @apply tw-text-pv-white;
  @apply tw-flex tw-flex-row tw-justify-between;
  @apply tw-my-6;

  &__content {
    @apply tw-text-pv-grey-16;
    @apply tw-p-4;

    @screen lg {
      @apply tw-p-6;
    }
  }

  &__media {
    @apply tw-flex tw-flex-col tw-justify-center tw-items-center;
    @apply tw-rounded-r-md;
    @apply tw-bg-pv-grey-80;
    @apply tw-px-4;
    height: initial;

    @screen md {
      @apply tw-px-8;
    }
  }
}
</style>
