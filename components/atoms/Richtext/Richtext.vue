<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-editable="richtext"
    class="paragraph-section"
    @click="handleClick"
    v-html="richtext"
  ></div>
</template>
<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    richtext: {
      type: String,
      default: '',
    },
  },
  setup() {
    const router = useRouter()

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

      router.push(targetUrl)
    }
    return { handleClick }
  },
})
</script>
<style lang="scss">
.paragraph-section {
  @apply tw-container;

  a {
    @apply tw-text-pv-red;

    &:hover {
      @apply tw-underline;
    }
  }

  ul {
    @apply tw-pl-0;
    @apply tw-overflow-hidden;
    @apply tw-list-square;
    @apply tw-list-inside;

    li {
      @apply tw-ml-0;

      &::marker {
        @apply tw-text-pv-red;
        @apply tw-text-xl tw-leading-6;
        @apply tw-mr-1;
      }

      p {
        @apply tw-inline-block;
        @apply tw-relative;
        left: -0.75rem;
      }
    }
  }

  ol {
    @apply tw-list-decimal;
  }
}
</style>
