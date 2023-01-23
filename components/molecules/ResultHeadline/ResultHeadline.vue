<template>
  <div
    :id="identifier"
    class="result-headline"
    :class="{
      'result-headline--with-link': link,
      'result-headline--without-link': !link,
    }"
  >
    <nuxt-link v-if="link" class="result-headline__link" :to="url">
      <Icon
        v-if="link"
        class="result-headline__icon"
        icon="arrow_back_ios"
        size="large"
      />
    </nuxt-link>
    <div class="result-headline__content">
      <h1 v-if="searchTerm || headline" class="result-headline__headline">
        {{ headlineText }}
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
import {
  defineComponent,
  computed,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ResultHeadline',
  components: { Icon },
  props: {
    headline: {
      type: String,
      required: true,
      default: '',
    },
    searchTerm: {
      type: String,
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
      type: String,
      default: null,
    },
    backButtonOverrideQueryParams: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute()
    const { i18n } = useContext()
    const headlineText = computed(() =>
      props.searchTerm
        ? `${i18n.t('category.searchResult')} "${props.searchTerm}"`
        : props.headline
    )

    const url = computed(() => ({
      path: props.link,
      query: { ...route.value.query, ...props.backButtonOverrideQueryParams },
    }))

    return { headlineText, url }
  },
})
</script>

<style lang="scss">
.result-headline {
  @apply tw-flex;
  @apply tw-items-center;
  @apply tw-mb-4;

  @screen md {
    @apply tw-mb-6;
  }

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
