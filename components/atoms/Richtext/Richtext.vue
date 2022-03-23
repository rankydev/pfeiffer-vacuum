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
      if (!event.target?.attributes?.href) {
        return
      }

      const linkNode = event.target
      // NOTE: we cannot use linkNode.href here, because this is the already processed url (absolute)
      const targetUrl = linkNode.attributes.href.value

      // download links, absolute links, mail links, telephone links
      if (
        linkNode.attributes.download ||
        targetUrl.startsWith('http') ||
        targetUrl.startsWith('mailto:') ||
        targetUrl.startsWith('tel:')
      ) {
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
  .tw-subline {
    @apply tw-block;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply tw-mb-4;

    & + p > .tw-subline:first-child {
      @apply tw--mt-4;
    }
  }

  p {
    @apply tw-mb-4;

    & + h2,
    & + h3,
    & + h4,
    & + h5,
    & + h6,
    & + p > .tw-subline:first-child {
      @apply tw-mt-8;
    }
  }

  a {
    @apply tw-text-pv-red;

    &:hover {
      @apply tw-underline;
    }
  }

  ul,
  ol {
    @apply tw-mb-8;

    li {
      &::marker {
        @apply tw-text-pv-red;
      }

      p {
        @apply tw-mb-2;
      }
    }
  }

  ol {
    counter-reset: item;
    @apply tw-ml-3;
    @apply tw-pl-0.5;

    li {
      counter-increment: item;

      p {
        margin-left: 2px;
      }

      &::marker {
        content: counters(item, '.') ' ';
      }
    }

    & ol {
      @apply tw-ml-7;

      & ol {
        @apply tw-ml-10;

        & ol {
          @apply tw-ml-14;
        }
      }
    }
  }

  ul {
    @apply tw-list-square;
    @apply tw-ml-5;

    li {
      p {
        margin-left: -4px;
      }

      &::marker {
        @apply tw-text-xl;
      }
    }
  }

  .superscript,
  .subscript {
    font-size: 75%;
    line-height: 0;
    top: -0.5em;
    position: relative;
    vertical-align: baseline;
  }

  .subscript {
    top: 0.5rem;
  }
}
</style>
