<template>
  <div class="link-list">
    <h5 v-if="title" class="link-list__title">{{ title }}</h5>
    <ul class="link-list__list">
      <li
        v-for="(linkItem, index) in links"
        :key="index"
        class="link-list__item"
      >
        <Link v-bind="linkItem" variant="textlink" />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'

export default defineComponent({
  name: 'LinkList',
  components: { Link },
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
  @apply tw-mb-2;
  @screen lg {
    @apply tw-mb-0;
  }

  &__title {
    @apply tw-mb-1;

    @screen lg {
      @apply tw-mb-2;
    }
  }

  &__item {
    @apply tw-pt-1;
    @apply tw-text-sm;

    @screen lg {
      @apply tw-pt-2;
      @apply tw-text-base;
    }
  }
}
</style>
