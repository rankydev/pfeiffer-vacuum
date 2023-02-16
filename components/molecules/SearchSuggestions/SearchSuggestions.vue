<template>
  <div class="search-suggestions">
    <SearchButton
      v-for="item in items"
      :key="item.value"
      class="search-header__suggestions--result"
      :title="item.value"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const suggestionHover = ref(false)

    console.log('props', props.items)
    const closeSearchfield = () => {
      blurSuggestions(false)
      isOpen.value = false
    }

    return {
      closeSearchfield,
      suggestionHover,
    }
  },
})
</script>
