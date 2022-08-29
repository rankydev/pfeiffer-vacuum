<template>
  <div
    :id="identifier"
    class="result-headline"
    :class="{
      'result-headline--with-link': link,
      'result-headline--without-link': !link,
    }"
  >
    <nuxt-link v-if="link" class="result-headline__link" :to="link">
      <Icon v-if="link" class="result-headline__icon" icon="arrow_back_ios" />
    </nuxt-link>
    <div class="result-headline__content">
      <h1 v-if="headline" class="result-headline__headline">
        {{ headline }}
      </h1>
      <span
        v-if="resultCount"
        class="result-headline__resultCount tw-subline-1"
      >
        ({{ resultCount }})
      </span>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atoms/Icon/Icon.vue'
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'ResultHeadline',
  components: { Icon },
  props: {
    headline: {
      type: String,
      required: true,
      default: '',
    },
    identifier: {
      type: String,
      default: null,
    },
    resultCount: {
      type: Number,
      default: null,
    },
    link: {
      type: [String, Object],
      default: null,
    },
  },
}
</script>

<style lang="scss">
.result-headline {
  @apply tw-flex;
  @apply tw-items-center;

  &--with-link {
    @apply tw-items-baseline;

    @screen md {
      @apply tw-items-center;
    }

    .result-headline__content {
      @screen md {
        @apply tw-flex;
        @apply tw-items-center;
      }
    }
  }

  &--without-link {
    .result-headline__content {
      @apply tw-flex;
      @apply tw-items-center;
    }
  }

  &__link {
    @apply tw-flex;
    @apply tw-items-center;
  }

  &__icon {
    @apply tw-text-pv-red;
    @apply tw-mr-2;

    &:hover {
      @apply tw-text-pv-red-darker;
    }
  }

  &__headline {
    @apply tw-mr-2;
  }
}
</style>