<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-editable="richtext"
    class="paragraph-section"
    @click="handleClick"
    v-html="sanitizer.block(richtext)"
  ></div>
  <!-- eslint-enable vue/no-v-html -->
</template>
<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useSanitizer } from '~/composables/sanitizer/useSanitizer'

export default defineComponent({
  name: 'Richtext',
  props: {
    /**
     * Prerendered HTML from storyblok richtext field
     */
    richtext: {
      type: String,
      default: '',
    },
  },
  setup() {
    const router = useRouter()
    const sanitizer = useSanitizer()

    const handleClick = (event) => {
      const linkNode = event.target
      // NOTE: we cannot use target.href here, because this is the already processed url (absolute)
      const targetUrl = linkNode?.getAttribute('href')

      // non <a> elements
      if (!targetUrl) {
        return
      }

      // new tab links, download links, absolute links, mail links, telephone links
      if (
        linkNode?.target === '_blank' ||
        linkNode?.download ||
        targetUrl.startsWith('http') ||
        targetUrl.startsWith('mailto:') ||
        targetUrl.startsWith('tel:')
      ) {
        return
      }

      event.preventDefault()
      router.push(targetUrl)
    }
    return { handleClick, sanitizer }
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
    @apply hover:tw-text-pv-red-lighter;
    @apply hover:tw-underline;
  }

  ul,
  ol {
    @apply tw-mb-8;

    li {
      p {
        @apply tw-mb-2;
      }
    }
  }

  ol {
    @apply tw-pl-0.5;
    @apply tw-list-none;
    counter-reset: item;

    li {
      counter-increment: item;

      &::before {
        @apply tw-float-left;
        @apply tw-mr-2;
        content: counters(item, '.') '. ';
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
        // Safari needs explicit opacity declaration in order to load color of marker correctly
        @apply tw-text-pv-red/100;
        @apply tw-text-lg;
      }
    }
  }

  & > *:last-child {
    @apply tw-mb-0;
  }
}
</style>
