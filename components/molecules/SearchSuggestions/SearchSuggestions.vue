<template>
  <div
    class="search-suggestions"
    @mouseover="$emit('suggestionHover', true)"
    @mouseleave="$emit('suggestionHover', false)"
  >
    <SearchButton
      v-for="item in items"
      :key="item.value"
      class="search-header__suggestions--result"
      :title="item.value"
      @closeModal="closeSearchfield"
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
  },
  emits: ['suggestionHover'],
  setup() {
    const closeSearchfield = () => {
      blurSuggestions(false)
      isOpen.value = false
    }

    return {
      closeSearchfield,
    }
  },
})
</script>
