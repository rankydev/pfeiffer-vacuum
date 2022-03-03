<template>
  <section class="footer-bottom">
    <ContentWrapper class="footer-bottom__wrapper">
      <language-switcher class="footer-bottom__language" />
      <div class="footer-bottom__copyright tw-text-inverse">
        <p>{{ copyright }}</p>
      </div>
    </ContentWrapper>
  </section>
</template>

<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import LanguageSwitcher from '../../../../molecules/LanguageSwitcher/LanguageSwitcher'

export default defineComponent({
  name: 'PvFooterBottom',
  components: { LanguageSwitcher },
  props: {
    /**
     * Copyright text
     */
    copyright: {
      type: String,
      default: '© 2021 Pfeiffer Vacuum GmbH',
    },
  },
})
</script>

<style lang="scss">
.footer-bottom {
  @apply tw-bg-pv-grey-32;

  &__wrapper {
    @layer tw-grid-container;
    @apply tw-p-1 md:tw-p-6;
  }

  &__copyright {
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-3;
    }

    @screen lg {
      @apply tw-col-span-8;
    }
  }

  &__language {
    @apply tw-col-span-12;
    @apply tw-text-pv-white;

    @screen md {
      @apply tw-col-span-1;
    }

    @screen lg {
      @apply tw-hidden;
    }
  }
}
</style>
