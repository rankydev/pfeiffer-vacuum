<template>
  <div v-editable="$attrs" class="link-list">
    <h5 v-if="title" class="link-list__title">{{ title }}</h5>
    <ul class="link-list__list">
      <li
        v-for="(linkItem, index) in links"
        :key="index"
        class="link-list__item"
      >
        <TextLink v-bind="linkItem" />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import TextLink from '~/components/molecules/Links/TextLink/TextLink'

export default defineComponent({
  name: 'LinkList',
  components: { TextLink },
  props: {
    /**
     * title
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * list of navigation entries
     */
    links: {
      type: Array,
      require: true,
      default: /* istanbul ignore next */ () => [],
    },
  },
})
</script>

<style lang="scss">
.link-list {
  &__title {
    @apply tw-mb-2;

    @screen lg {
      @apply tw-mb-4;
    }
  }

  &__item {
    @apply tw-mb-1;

    @screen lg {
      @apply tw-mb-2;
    }
  }
}
</style>
