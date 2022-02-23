<template>
  <div class="link-list">
    <h5 class="link-list__title">{{ linkList.title }}</h5>
    <ul class="link-list__list">
      <li
        v-for="(linkItem, index) in linkList.links"
        :key="index"
        class="link-list__item"
      >
        <nuxt-link :to="linkItem.link.href">{{ linkItem.label }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LinkList',
  props: {
    linkList: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
})
</script>

<style lang="scss">
.link-list {
  &__title {
    @apply tw-mb-4;
  }

  &__item {
    @apply tw-transition-colors;
    @apply tw-duration-300;
    @apply tw-ease-out;
    @apply tw-leading-6;
    @apply tw-mb-2;

    &:hover {
      @apply tw-text-pv-red;
    }
  }
}
</style>
