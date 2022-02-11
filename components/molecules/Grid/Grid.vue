<template>
  <div class="tw-grid-container">
    <NuxtDynamic
      v-for="(item, index) in items"
      :key="item._uid"
      v-editable="true"
      :name="item.component"
      :content="item"
      :class="getColSpanClasses(index)"
    />
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'Grid',
  props: {
    colSpan: {
      type: String,
      default: '[12]',
    },
    columns: {
      type: String,
      default: '12',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const colSpanArr = computed(() => props.colSpan.split(','))

    const classList = {
      12: 'tw-col-span-4 md:tw-col-span-8 lg:tw-col-span-12',
      8: 'tw-col-span-3 md:tw-col-span-5 lg:tw-col-span-8',
      6: 'tw-col-span-2 md:tw-col-span-4 lg:tw-col-span-6',
      4: 'tw-col-span-1 md:tw-col-span-3 lg:tw-col-span-4',
      3: 'tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3',
      2: 'tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-2',
    }

    const getColSpanClasses = (index) => {
      return classList[colSpanArr.value[index]]
    }

    return {
      getColSpanClasses,
    }
  },
}
</script>
