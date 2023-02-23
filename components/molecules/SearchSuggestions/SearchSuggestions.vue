<template>
  <div
    class="search-suggestions"
    @mouseover="$emit('suggestionHover', true)"
    @mouseleave="$emit('suggestionHover', false)"
  >
    <SearchButton
      v-for="item in items"
      :key="item[objectKey]"
      :title="item[objectKey]"
      :search-type="searchType"
      class="search-header__suggestions--result"
      @click="$emit('click', $event)"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    searchType: {
      type: String,
      default: '',
    },
    objectKey: {
      type: String,
      default: 'value',
    },
  },
  emits: ['suggestionHover', 'click'],
})
</script>
