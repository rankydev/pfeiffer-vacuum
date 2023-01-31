<template>
  <article>
    <Link :href="localePath('shop-cart')" class="document-item__link">
      <div class="document-item">
        <h5 class="document-item__name">HiPace 300 with TC 400</h5>
        <div>HiPace 300</div>
        <div>Deutsch</div>
        <div>12.12.2022</div>
        <p>
          Betriebsanleitung Operating Instructions DE EN Original HiPace 300
        </p>
        <Link :href="localePath('test')" class="document-item__icon-link">
          <Icon class="document-item__icon" icon="file_download" size="base" />
        </Link>
      </div>
    </Link>

    <div class="document-item__container">
      <div class="document-item">
        <h5 class="document-item__name">HiPace 300 with TC 400</h5>
        <div class="document-item__product">HiPace 300</div>
        <div class="document-item__data">
          <div>Deutsch</div>
          <div>12.12.2022</div>
        </div>
        <p>
          Betriebsanleitung Operating Instructions DE EN Original HiPace 300
        </p>
        <div class="document-item__links">
          <Link
            :href="localePath('test')"
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
            :href="localePath('test')"
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
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'DocumentCardTest',
  components: {
    Link,
    Icon,
  },
  props: {
    product: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter()
    console.log(router)
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
  @include box-shadow;

  @screen md {
    @apply tw-my-1;
  }

  &__link {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
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
