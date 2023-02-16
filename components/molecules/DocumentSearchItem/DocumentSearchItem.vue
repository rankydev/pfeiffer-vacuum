<template>
  <article>
    <Link class="document-item__link" @click="$emit('click')">
      <div class="document-item">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h5 v-html="product.title" />
        <div v-if="product.subtitle" class="document-item__data">
          <div v-for="(item, index) in product.subtitle" :key="getKey(index)">
            {{ item }}
          </div>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-if="product.body" v-html="product.body" />
        <Link
          v-if="product.downloadLink"
          v-bind="downloadButtonBaseData"
          class="document-item__icon-link"
        >
          <Icon class="document-item__icon" icon="file_download" size="base" />
        </Link>
      </div>
    </Link>

    <div class="document-item__container">
      <div class="document-item">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h5 v-html="product.title" />
        <div v-if="product.subtitle[0]" class="document-item__product">
          {{ product.subtitle[0] }}
        </div>
        <div
          v-if="subtitleRemainingelements.length"
          class="document-item__data"
        >
          <div
            v-for="(item, index) in subtitleRemainingelements"
            :key="getKey(index)"
          >
            {{ item }}
          </div>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-if="product.body" v-html="product.body" />
        <div class="document-item__links">
          <Link
            v-if="product.downloadLink"
            v-bind="downloadButtonBaseData"
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
          <Link class="document-item__icon-link product-link">
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
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api'
import getKey from '~/composables/useUniqueKey'
import { useEmpolisHelper } from '~/composables/useEmpolisHelper'

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
      default: () => ({}),
    },
  },
  emits: ['click'],
  setup(props) {
    const { getDownloadButtonBaseConfig } = useEmpolisHelper()
    const { product } = toRefs(props)

    const subtitleRemainingelements = product.value.subtitle.slice(1, 3)

    const downloadButtonBaseData = computed(() =>
      getDownloadButtonBaseConfig(product.value)
    )

    return {
      getKey,
      subtitleRemainingelements,
      downloadButtonBaseData,
    }
  },
})
</script>
<style lang="scss">
@import '/assets/scss/mixins';

.document-item {
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

  /* stylelint-disable */
  concept,
  hit {
    @apply tw-bg-pv-red-opacity;
  }
  /* stylelint-enable */
  &__link {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
    }

    &:hover {
      h5 {
        @apply tw-text-pv-red-lighter;
      }
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
        @apply tw-bg-pv-red-opacity;
      }
    }
  }
}
</style>
