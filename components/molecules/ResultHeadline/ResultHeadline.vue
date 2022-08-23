<template>
  <div :id="identifier" class="search-headline">
    <nuxt-link
      v-if="backLink"
      class="search-headline__back-link"
      :to="backLink"
    >
      <Icon
        v-if="backLink"
        class="search-headline__icon"
        icon="arrow_back_ios"
      />
    </nuxt-link>
    <h1 class="search-headline__headline">
      {{ headline }}
    </h1>
    <span v-if="count" class="product-count">({{ count }})</span>
  </div>
</template>

<script>
import Icon from '~/components/atoms/Icon/Icon.vue'

export default {
  name: 'ResultHeadline',
  components: { Icon },
  props: {
    headline: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      default: null,
    },
    count: {
      type: Number,
      default: null,
    },
    backLink: {
      type: [String, Object],
      default: null,
    },
  },
}
</script>

<style lang="scss">
.search-headline {
  @apply tw-flex;
  align-items: center;

  &__back-link {
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
