<template>
  <footer v-editable="$attrs" class="footer tw-col-span-full">
    <SocialMedia
      v-if="socialMedia"
      class="footer__top"
      :social-media="socialMedia"
    />

    <section class="footer__bottom tw-text-inverse">
      <ContentWrapper class="footer__bottom-content tw-grid-container">
        <div class="footer__menu">
          <LinkList
            v-for="menu in navigationColumns"
            v-bind="menu"
            :key="menu._uid"
            class="footer__menu-element"
          />
        </div>

        <FooterNewsletter class="footer__newsletter" />

        <hr class="footer__ruler" />

        <LanguageSwitcher class="footer__language" />

        <div class="footer__copyright">
          <p>{{ copyright }}</p>
        </div>
      </ContentWrapper>
    </section>
  </footer>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import FooterNewsletter from './partials/FooterNewsletter/FooterNewsletter'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import LinkList from '~/components/molecules/LinkList/LinkList'
import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher'

export default defineComponent({
  name: 'Footer',
  components: {
    SocialMedia,
    FooterNewsletter,
    ContentWrapper,
    LinkList,
    LanguageSwitcher,
  },
  props: {
    /**
     * Social Media Channels on top of the footer
     */
    socialMedia: {
      type: Array,
      default: () => [],
    },
    /**
     * List of LinkLists with titles and newsletter block
     */
    navigationColumns: {
      type: Array,
      default: () => [],
    },
    /**
     * Newsletter sign up form
     */
    newsletter: {
      type: Array,
      default: () => [],
    },
    /**
     * Legal text and copyright
     */
    copyright: {
      type: String,
      default: null,
    },
  },
})
</script>

<style lang="scss">
.footer {
  &__bottom {
    @apply tw-bg-pv-grey-32;
  }

  &__bottom-content {
    @apply tw-py-6;

    @screen lg {
      @apply tw-py-8;
    }
  }

  &__menu {
    @apply tw-grid tw-gap-4;
    @apply tw-col-span-full;
    grid-template-columns: repeat(3, 1fr);

    @screen lg {
      @apply tw-col-span-8;
    }
  }

  &__menu-element {
    @apply tw-col-span-full;

    @screen md {
      @apply tw-col-span-1;
    }

    .link-list__title {
      @apply tw-text-pv-white;
    }
  }

  &__newsletter {
    @apply tw-col-span-full;

    @screen lg {
      @apply tw-col-span-4;
    }
  }

  &__ruler {
    @apply tw-col-span-full;
    @apply tw-text-pv-grey-48;
  }

  &__language {
    @apply tw-col-span-full;
    @apply tw-text-pv-white;

    @screen md {
      @apply tw-col-span-1;
    }

    @screen lg {
      @apply tw-hidden;
    }
  }

  &__copyright {
    @apply tw-col-span-3;

    @screen md {
      @apply tw-col-span-3;
    }

    @screen lg {
      @apply tw-col-span-8;
    }
  }
}
</style>
