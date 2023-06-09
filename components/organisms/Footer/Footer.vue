<template>
  <footer class="footer tw-col-span-full">
    <SocialMedia
      v-if="socialMedia"
      class="footer__top"
      :social-media="socialMedia"
    />

    <section class="footer__bottom tw-text-inverse">
      <ContentWrapper class="footer__bottom-content tw-grid-container">
        <div class="footer__menu">
          <FooterLinkList
            v-for="menu in navigationColumns"
            v-bind="menu"
            :key="menu._uid"
            class="footer__menu-element"
          />
        </div>
        <NuxtDynamic
          v-for="item in newsletter"
          :key="item._uid"
          v-bind="item"
          v-editable="item"
          :name="item.uiComponent || item.component"
        />

        <hr class="footer__ruler" />

        <LanguageSwitcher class="footer__language" />

        <div class="footer__copyright">
          <p>{{ copyright }}</p>
        </div>

        <Link
          v-if="hasVersionInfo"
          class="footer__version"
          :href="commitUrl"
          :label="versionInfo"
          target="_blank"
          variant="textlink"
        />
      </ContentWrapper>
    </section>
  </footer>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import FooterLinkList from '~/components/molecules/FooterLinkList/FooterLinkList'
import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher'
import Link from '~/components/atoms/Link/Link'

export default defineComponent({
  name: 'Footer',
  components: {
    SocialMedia,
    ContentWrapper,
    FooterLinkList,
    LanguageSwitcher,
    Link,
  },
  props: {
    /**
     * Social Media Channels on top of the footer
     */
    socialMedia: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
    /**
     * List of LinkLists with titles and newsletter block
     */
    navigationColumns: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
    /**
     * Legal text and copyright
     */
    copyright: {
      type: String,
      default: null,
    },
    newsletter: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { $config } = useContext()
    const hasVersionInfo =
      $config.NODE_ENV === 'development' &&
      Boolean($config.CI_COMMIT_SHORT_SHA) &&
      Boolean($config.CI_COMMIT_REF_NAME)

    if (!hasVersionInfo) {
      return {
        hasVersionInfo,
      }
    }

    const versionInfo = `Version: ${$config.CI_COMMIT_REF_NAME}/${$config.CI_COMMIT_SHORT_SHA}`

    const commitUrl = `${$config.CI_PROJECT_URL}/-/commit/${$config.CI_COMMIT_SHORT_SHA}`

    return {
      hasVersionInfo,
      versionInfo,
      commitUrl,
    }
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
    @apply tw-relative;

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

  &__version {
    @apply tw-col-span-3;
    @apply tw-absolute;
    @apply tw-right-8;
    @apply tw-bottom-8;
    @apply tw-text-pv-green;

    @screen md {
      @apply tw-col-span-3;
    }

    @screen lg {
      @apply tw-col-span-8;
    }
  }
}
</style>
