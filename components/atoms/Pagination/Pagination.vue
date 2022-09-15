<template>
  <nav role="navigation" aria-label="Pagination Navigation" class="pagination">
    <span class="pagination__prefix pagination--desktop">Page:</span>
    <ul class="pagination__list">
      <li>
        <a
          class="pagination__entry pagination__icon"
          :class="{ 'pagination__icon--disabled': isFirst }"
          v-bind="{ ...(!isFirst && getHref(currentPage - 1)) }"
        >
          <Icon aria-hidden="true" size="xsmall" icon="arrow_back" />
          <span class="tw-sr-only">Previous</span>
        </a>
      </li>

      <li v-for="page in pageArray" :key="page" class="pagination--desktop">
        <template v-if="!isDot(page)">
          <a
            class="pagination__entry"
            :class="{ 'pagination__entry--current': page === currentPage }"
            v-bind="{ ...(page !== currentPage && getHref(page)) }"
          >
            <span class="tw-sr-only">Page</span>
            {{ page }}
          </a>
        </template>

        <template v-else>
          <a class="pagination__entry pagination__ellipses">
            <span>&#8230;</span>
          </a>
        </template>
      </li>

      <li class="pagination__counter pagination--mobile">
        {{ $t('navigation.pagination.counter', { currentPage, totalPages }) }}
      </li>

      <li>
        <a
          class="pagination__entry pagination__icon"
          :class="{ 'pagination__icon--disabled': isLast }"
          v-bind="{ ...(!isLast && getHref(currentPage + 1)) }"
        >
          <Icon aria-hidden="true" size="xsmall" icon="arrow_forward" />
          <span class="tw-sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The url to navigate through the paginated pages
     */
    baseUrl: {
      type: String,
      required: true,
    },
    /**
     * current visible page
     */
    currentPage: {
      type: Number,
      default: 1,
    },
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
    const cols = 7

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

      const first = parseInt(props.currentPage) - Math.floor(cols / 2)
      const last = parseInt(props.currentPage) + Math.floor(cols / 2)

      let pageArray = []

      if (first <= 0) {
        pageArray = buildRange(1, cols)
      } else if (last >= props.totalPages) {
        pageArray = buildRange(props.totalPages - cols + 1, props.totalPages)
      } else {
        pageArray = buildRange(first, last)
      }

      const hasFirst = pageArray[0] === 1
      const hasLast = pageArray[pageArray.length - 1] === props.totalPages
      return [
        ...(!hasFirst ? [1, 'dots-left'] : []),
        ...pageArray.slice(!hasFirst && 2).slice(...(!hasLast ? [0, -2] : [])),
        ...(!hasLast ? ['dots-right', props.totalPages] : []),
      ]
    })

    const isFirst = computed(() => props.currentPage === 1)
    const isLast = computed(() => props.currentPage === props.totalPages)
    const isDot = (page) => ['dots-left', 'dots-right'].includes(page)
    const getHref = (id) => ({ href: `${props.baseUrl}/${id}` })

    return {
      pageArray,
      isDot,
      isFirst,
      isLast,
      getHref,
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

  &__entry {
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
    @apply tw-mx-2;
    @apply tw-h-10 tw-w-44;
    @apply tw-text-pv-grey-48;
    @apply tw-leading-6;
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
    }

    &__entry {
      @apply tw-text-pv-grey-48;

      &:hover {
        @apply tw-bg-pv-red-lighter;
        @apply tw-text-pv-white;
      }

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
