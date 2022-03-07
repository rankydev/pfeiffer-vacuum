<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-editable="content"
    class="paragraph-section"
    @click="handleClick"
    v-html="richtext"
  ></div>
</template>
<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const richtext = computed(() => props.content.richtext)
    const handleClick = (event) => {
      // non <a> elements
      if (
        !event.target ||
        !event.target.attributes ||
        !event.target.attributes.href
      ) {
        return
      }

      const linkNode = event.target
      // NOTE: we cannot use linkNode.href here, because this is the already processed url (absolute)
      const targetUrl = linkNode.attributes.href.value

      // download links
      if (linkNode.attributes.download) {
        return
      }

      // absolute links
      if (targetUrl.startsWith('http')) {
        return
      }

      // email address link
      if (targetUrl.startsWith('mailto:')) {
        return
      }

      // telephone link
      if (targetUrl.startsWith('tel:')) {
        return
      }

      event.preventDefault()
      this.$router.push(targetUrl)
    }
    return { richtext, handleClick }
  },
})
</script>
<style lang="scss">
.paragraph-section {
  a {
    @apply tw-text-pv-red;

    &:hover {
      @apply tw-underline;
    }
  }

  ul {
    @apply tw-list-none;
    @apply tw-pl-0;
    @apply tw-overflow-hidden;

    li {
      @apply tw-ml-0;

      &::before {
        @apply tw-text-pv-red;
        @apply tw-w-12;
        @apply tw-h-12;
        @apply tw-text-2xl tw-leading-6;
        @apply tw-pr-1;
        @apply tw-top-0;
        @apply tw-relative;
        @apply tw-content-['\25AA'];
      }
    }
  }
}
</style>
