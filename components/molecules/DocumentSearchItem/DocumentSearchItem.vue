<template>
  <article>
    <Link :href="product.productUrl" target="_blank" class="document-item__link">
      <div class="document-item">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h5 v-html="formatHtml(name)" />
        <div class="document-item__data">
          <div>{{ product.category }}</div>
          <div>{{ product.language }}</div>
          <div>{{ product.date }}</div>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="formatHtml(product.description)" />
        <Link :href="product.downloadUrl" class="document-item__icon-link">
          <Icon class="document-item__icon" icon="file_download" size="base" />
        </Link>
      </div>
    </Link>

    <div class="document-item__container">
      <div class="document-item">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h5 v-html="formatHtml(name)" />
        <div class="document-item__product">{{ product.category }}</div>
        <div class="document-item__data">
          <div>{{ product.language }}</div>
          <div>{{ product.date }}</div>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="formatHtml(product.description)" />
        <div class="document-item__links">
          <Link
            :href="product.productUrl"
            target="_blank"
            class="document-item__icon-link download-link"
          >
            <span class="document-item__icon-text">
              {{ $t('product.download') }}
            </span>
            <Icon
              class="document-item__icon"
              icon="file_download"
              size="base"
            />
          </Link>
          <Link
            :href="product.downloadUrl"
            class="document-item__icon-link product-link"
          >
            <Icon
              class="document-item__icon"
              icon="arrow_forward"
              size="base"
            />
          </Link>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import {
  computed,
  defineComponent,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'DocumentSearchItem',
  components: {
    Link,
    Icon,
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {
          name: 'HiPace 300 with TC 400',
          category: 'Hipace 300',
          language: 'Deutsch',
          date: '12.12.2022',
          description: `
            Betriebsanleitung Operating Instructions DE EN Original HiPace 300
          `,
          productUrl: 'google.com',
          downloadUrl: 'google.com',
        }
      },
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  setup() {
    const route = useRoute()
    const name = computed(() => 'HiPace 300 with TC 400')
    const searchTerm = ref(route.value.query.searchTerm || '')

    const formatHtml = (input) => {
      const regexp = new RegExp(searchTerm.value, 'ig')
      const formatInput = input.replace(
        regexp,
        '<span class="marked">$&</span>'
      )
      return formatInput
    }

    return {
      name,
      formatHtml,
    }
  },
})
</script>
<style lang="scss">
@import '/assets/scss/mixins';

.document-item {
  @include box-shadow;
  @apply tw-block;
  @apply tw-relative;
  @apply tw-overflow-hidden;
  @apply tw-bg-pv-white;
  @apply tw-p-4;
  @apply tw-my-4;
  @apply tw-text-pv-grey-16;
  @apply tw-rounded-md;

  @screen md {
    @apply tw-my-1;
  }

  .marked {
    @apply tw-bg-pv-red-opacity;
  }

  &__link {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
    }

    .document-item {
      &__data {
        @apply tw-flex;
        @apply tw-leading-3;
        @apply tw-my-4;

        div {
          @apply tw-px-2;
          @apply tw-border-r-2 tw-border-pv-red;
          @apply tw-text-sm;
          max-width: 90%;

          &:first-of-type {
            @apply tw-pl-0;
          }

          &:last-of-type {
            @apply tw-pr-0;
            @apply tw-border-r-0;
          }
        }
      }

      p {
        max-width: 90%;
      }
    }
  }

  &__container {
    @apply tw-block;

    .document-item {
      &__name {
        @apply tw-text-sm;
        @apply tw-mb-1;
      }

      &__product {
        @apply tw-text-pv-grey-48;
        @apply tw-text-sm;
      }

      &__data {
        @apply tw-flex;
        @apply tw-my-6;
        @apply tw-text-sm;
        @apply tw-leading-3;

        div:first-of-type {
          @apply tw-pr-2;
          @apply tw-border-r-2 tw-border-pv-red;
        }

        div:last-of-type {
          @apply tw-pl-2;
        }
      }

      &__links {
        @apply tw-pt-4;
        @apply tw-flex tw-items-center;
      }

      &__icon-link {
        @apply tw-flex tw-items-center;
        @apply tw-border-2 tw-border-pv-red;
        @apply tw-rounded-md;
        @apply tw-p-4;
      }

      .download-link {
        @apply tw-flex-1 tw-mr-4;
        @apply tw-flex tw-items-center tw-justify-between;
        @apply tw-font-bold tw-text-pv-red;
      }
    }

    @screen md {
      @apply tw-hidden;
    }
  }

  &__icon {
    @apply tw-text-pv-red;
    @apply tw-right-2 tw-bottom-2;
    @apply tw-rounded-md;

    @screen md {
      @apply tw-absolute;
      @apply tw-right-4 tw-bottom-1/2;
      @apply tw-border-2 tw-border-pv-red;
      @apply tw-p-4;
      transform: translate(0, 50%);

      &:hover {
        @apply tw-text-pv-red-lighter;
        @apply tw-border-pv-red-lighter;
      }
    }
  }
}
</style>
