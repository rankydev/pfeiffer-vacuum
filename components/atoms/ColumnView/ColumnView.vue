<template>
  <div class="column-view tw-column-view" :class="columnPlacment">
    <NuxtDynamic
      v-for="item in column1"
      :key="item._uid"
      v-editable="item"
      class="column-view__column1"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
    <NuxtDynamic
      v-for="item in column2"
      :key="item._uid"
      v-editable="item"
      class="column-view__column2"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
    <NuxtDynamic
      v-for="item in column3"
      :key="item._uid"
      v-editable="item"
      class="column-view__column3"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
  </div>
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ColumnView',
  components: {},
  props: {
    /**
     * Array of content rendered in the Column View
     */
    column1: {
      type: Array,
      default: () => [],
    },
    column2: {
      type: Array,
      default: () => [],
    },
    column3: {
      type: Array,
      default: () => [],
    },
    /**
     * Selectable varian of the columns spacing (33:33:33, 50:50, 66)
     */
    variant: {
      type: String,
      default: '66',
    },
  },
  setup(props) {
    const columnPlacment = computed(() => {
      if (props.variant === '33:33:33') {
        return 'column-view__width-33'
      }
      if (props.variant === '50:50') {
        return 'column-view__width-50'
      } else {
        return 'column-view__width-full'
      }
    })

    return {
      columnPlacment,
    }
  },
})
</script>
<style lang="scss">
.column-view {
  @apply tw-grid;
  @apply tw-mt-12;
  @apply tw-mb-12;

  @screen lg {
    @apply tw-mt-12;
    @apply tw-mb-24;
  }

  &__width-33 {
    @screen md {
      @apply tw-flex;
    }
    @screen lg {
      @apply tw-grid;
    }

    .column-view__column1 {
      @apply tw-col-span-4;

      @screen md {
        @apply tw-w-2/6;
      }

      @screen lg {
        @apply tw-w-full;
        @apply tw-col-span-4;
      }
    }

    .column-view__column2 {
      @apply tw-col-span-4;

      @screen md {
        @apply tw-w-2/6;
      }

      @screen lg {
        @apply tw-w-full;
        @apply tw-col-start-5;
        @apply tw-col-end-9;
      }
    }

    .column-view__column3 {
      @apply tw-col-span-4;

      @screen md {
        @apply tw-w-2/6;
      }

      @screen lg {
        @apply tw-w-full;
        @apply tw-col-start-9;
        @apply tw-col-end-13;
      }
    }
  }

  &__width-50 {
    .column-view__column1 {
      @apply tw-col-span-4;

      @screen md {
        @apply tw-col-span-4;
      }

      @screen lg {
        @apply tw-col-span-6;
      }
    }

    .column-view__column2 {
      @apply tw-col-span-4;

      @screen md {
        @apply tw-col-start-5;
        @apply tw-col-span-4;
      }

      @screen lg {
        @apply tw-col-start-7;
        @apply tw-col-span-6;
      }
    }
  }

  &__width-full {
    .column-view__column1 {
      @apply tw-col-start-1;
      @apply tw-col-end-5;

      @screen md {
        @apply tw-col-start-2;
        @apply tw-col-end-8;
      }

      @screen lg {
        @apply tw-col-start-3;
        @apply tw-col-end-11;
      }
    }
  }
}
</style>
