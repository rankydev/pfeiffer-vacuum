<template>
  <div class="infobox tw-grid-container tw-my-component-wide">
    <div class="infobox__content">
      <p class="infobox__content__text">
        {{ $t('registration.infotext') }}
      </p>
    </div>
    <div class="infobox__media">
      <Icon icon="info" size="large" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
})
</script>

<style lang="scss">
.infobox {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-lg;
  @apply tw-text-pv-white;

  &__content {
    @apply tw-col-span-3;
    @apply tw-p-4;
    @apply tw-text-pv-black;

    @screen md {
      @apply tw-col-span-7;
    }

    @screen lg {
      @apply tw-col-span-10;
      @apply tw-p-6;
    }
  }

  &__media {
    @apply tw-flex tw-flex-col tw-justify-center tw-items-center;
    @apply tw-h-full;
    @apply tw-rounded-r-lg;
    @apply tw-bg-pv-grey-80;
    @apply tw-col-span-1;

    @screen md {
      @apply tw-col-span-1;
    }

    @screen lg {
      @apply tw-col-span-2;
    }
  }
}
</style>
