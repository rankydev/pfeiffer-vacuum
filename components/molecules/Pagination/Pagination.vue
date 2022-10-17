<template>
  <nav role="navigation" aria-label="Pagination Navigation" class="pagination">
    <span class="pagination__prefix pagination--desktop">Page:</span>
    <ul class="pagination__list">
      <li>
        <component
          :is="isFirst ? 'a' : 'NuxtLink'"
          class="pagination__icon"
          :class="{ 'pagination__icon--disabled': isFirst }"
          v-bind="{ ...(!isFirst && createNavLink(currentPage - 1)) }"
        >
          <Icon aria-hidden="true" size="base" icon="arrow_back" />
          <span class="tw-sr-only">
            {{ $t('navigation.pagination.screenreader.prev') }}
          </span>
        </component>
      </li>

      <li v-for="page in pageArray" :key="page" class="pagination--desktop">
        <template v-if="!isDot(page)">
          <component
            :is="page === currentPage ? 'a' : 'NuxtLink'"
            class="pagination__entry"
            :class="{ 'pagination__entry--current': page === currentPage }"
            v-bind="{ ...(page !== currentPage && createNavLink(page)) }"
          >
            <span class="tw-sr-only">
              {{ $t('navigation.pagination.screenreader.page') }}:
            </span>
            {{ page }}
          </component>
        </template>

        <template v-else>
          <a class="pagination__ellipses">
            <span>&#8230;</span>
          </a>
        </template>
      </li>

      <li class="pagination__counter pagination--mobile">
        {{ $t('navigation.pagination.counter', { currentPage, totalPages }) }}
      </li>

      <li>
        <component
          :is="isLast ? 'a' : 'NuxtLink'"
          class="pagination__icon"
          :class="{ 'pagination__icon--disabled': isLast }"
          v-bind="{ ...(!isLast && createNavLink(currentPage + 1)) }"
        >
          <Icon aria-hidden="true" size="base" icon="arrow_forward" />
          <span class="tw-sr-only">
            {{ $t('navigation.pagination.screenreader.next') }}
          </span>
        </component>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, computed, useRoute } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    /**
     * total number of paginated pages
     */
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    /**
     * number of visible columns without prev and next arrow
     */
    const cols = 6

    const route = useRoute()

    /**
     * Retreives the current page from the url
     */
    const currentPage = computed(() =>
      parseInt(route.value.query.currentPage || 1)
    )

    /**
     * Helper function to build an range array
     *
     * @param {Number} start first value of the array
     * @param {Number} end last value of the array
     */
    const buildRange = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx)
    }

    /**
     * build the page array based on the current page and the total numbers of pages
     */
    const pageArray = computed(() => {
      if (cols >= props.totalPages) {
        return buildRange(1, props.totalPages)
      }

      // calculate first and last value of the page array for a given page
      const first = parseInt(currentPage.value) - Math.floor((cols - 1) / 2)
      const last = parseInt(currentPage.value) + Math.floor(cols / 2)
      let pageArray = []

      // build page array which does not exceed the given range
      if (first <= 0) {
        pageArray = buildRange(1, cols)
      } else if (last >= props.totalPages) {
        pageArray = buildRange(props.totalPages - cols + 1, props.totalPages)
      } else {
        pageArray = buildRange(first, last)
      }

      // check if the first/last page is included in the page array
      const hasFirst = pageArray[0] === 1
      const hasLast = pageArray[pageArray.length - 1] === props.totalPages

      return [
        // add first page and dot values if the first page is not present
        ...(!hasFirst ? [1, 'dots-left'] : []),
        // remove the first/last two elements if the first/last page is not included in the page array
        ...pageArray.slice(!hasFirst && 2).slice(...(!hasLast ? [0, -2] : [])),
        // add dot values and last page if the first page is not present
        ...(!hasLast ? ['dots-right', props.totalPages] : []),
      ]
    })

    const isFirst = computed(() => currentPage.value === 1)
    const isLast = computed(() => currentPage.value === props.totalPages)
    const isDot = (page) => ['dots-left', 'dots-right'].includes(page)

    /**
     * build a nuxt link to object for the given page id.
     */
    const createNavLink = (currentPage) => {
      const { hash, params, path, query } = route.value
      return {
        to: {
          hash,
          params,
          path,
          query: { ...query, currentPage },
        },
      }
    }
    return {
      currentPage,
      pageArray,
      isDot,
      isFirst,
      isLast,
      createNavLink,
    }
  },
})
</script>

<style lang="scss">
.pagination {
  @apply tw-flex;
  @apply tw-items-center;

  &__list {
    @apply tw-flex;
  }

  &__entry,
  &__icon,
  &__ellipses {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-h-10 tw-w-10;
    @apply tw-leading-6;
    @apply tw-font-bold;
    @apply tw-rounded;
  }

  &__counter {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-h-10 tw-w-44;
    @apply tw-text-pv-grey-48;
    @apply tw-leading-6;
    @apply tw-mx-2;
    @apply tw-font-bold;
    @apply tw-bg-pv-red;
    @apply tw-text-pv-white;
    @apply tw-rounded;
  }

  &__icon {
    @apply tw-leading-6;
    @apply tw-text-pv-red;
    @apply tw-shadow-border-red;

    &--disabled {
      @apply tw-shadow-border-grey-80;
      @apply tw-bg-pv-transparent;
      @apply tw-text-pv-grey-80;
    }
  }

  &--mobile {
    @screen md {
      @apply tw-hidden;
    }
  }

  &--desktop {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
    }
  }

  @screen md {
    &__prefix {
      @apply tw-text-xs;
      @apply tw-leading-4;
      @apply tw-text-pv-grey-48;
      @apply tw-mr-2;
    }

    &__entry,
    &__ellipses {
      @apply tw-text-pv-grey-48;
    }

    &__entry,
    &__icon {
      &:hover {
        @apply tw-bg-pv-red-lighter;
        @apply tw-text-pv-white;
      }
    }

    &__entry {
      &--current {
        @apply tw-relative;
        @apply tw-text-pv-red;

        &:hover {
          @apply tw-bg-pv-transparent;
          @apply tw-text-pv-red;
        }

        &::after {
          @apply tw-absolute;
          @apply tw-inset-x-2 tw-bottom-0;
          @apply tw-h-1;
          @apply tw-bg-pv-red;
          @apply tw-rounded-t-sm;
          content: '';
        }
      }
    }

    &__icon {
      @apply tw-shadow-none;
      @apply tw-text-pv-red;

      &--disabled,
      &--disabled:hover {
        @apply tw-text-pv-grey-80;
        @apply tw-bg-pv-transparent;
        @apply tw-shadow-none;
      }
    }

    &__ellipses:hover {
      @apply tw-bg-pv-transparent;
      @apply tw-text-pv-grey-48;
    }
  }
}
</style>
