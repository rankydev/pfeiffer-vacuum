<template>
  <div :id="identifier" class="result-headline">
    <nuxt-link v-if="link" class="result-headline__link" :to="link">
      <Icon v-if="link" class="result-headline__icon" icon="arrow_back_ios" />
    </nuxt-link>
    <h1 class="result-headline__headline">
      {{ headline }}
    </h1>
    <span v-if="resultCount" class="result-headline__resultCount"
      >{{ resultCount }}
    </span>
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
  align-items: center;

  &__link {
    display: flex;
    align-items: center;
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
