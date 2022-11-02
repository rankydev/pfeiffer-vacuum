<template>
  <div
    class="column-view tw-column-view"
    :class="`column-view__width-${variant}`"
  >
    <div class="column-view__column1">
      <NuxtDynamic
        v-for="item in column1"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </div>
    <div v-if="variant !== '66'" class="column-view__column2">
      <NuxtDynamic
        v-for="item in column2"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </div>
    <div v-if="variant === '33'" class="column-view__column3">
      <NuxtDynamic
        v-for="item in column3"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ColumnView',
  props: {
    /**
     * Array of content rendered in column 1
     */
    column1: {
      type: Array,
      default: () => [],
    },
    /**
     * Array of content rendered in column 2
     */
    column2: {
      type: Array,
      default: () => [],
    },
    /**
     * Array of content rendered in column 3
     */
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
      validator: (val) => ['66', '50', '33'].includes(val),
    },
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
    @apply tw-flex;
    @apply tw-flex-col;

    @screen md {
      @apply tw-flex-row;
    }

    .column-view__column1,
    .column-view__column2,
    .column-view__column3 {
      @apply tw-w-full;

      @screen md {
        @apply tw-w-2/6;
      }
    }
  }

  &__width-50 {
    .column-view__column1,
    .column-view__column2 {
      @apply tw-col-span-4;

      @screen md {
        @apply tw-col-span-4;
      }

      @screen lg {
        @apply tw-col-span-6;
      }
    }

    .column-view__column2 {
      @screen md {
        @apply tw-col-start-5;
      }

      @screen lg {
        @apply tw-col-start-7;
      }
    }
  }

  &__width-66 {
    .column-view__column1 {
      @apply tw-col-span-full;

      @screen md {
        @apply tw-col-span-full;
      }

      @screen lg {
        @apply tw-col-start-3;
        @apply tw-col-end-11;
      }
    }
  }
}
</style>
