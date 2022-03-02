<template>
  <section class="footer-bottom">
    <div class="footer-bottom__wrapper tw-grid-container">
      <language-switcher class="footer-bottom__language" />
      <div class="footer-bottom__copyright tw-text-inverse">
        <p>{{ copyright }}</p>
      </div>
    </div>
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
  setup(props) {
    const {} = toRefs(props)
  },
})
</script>

<style lang="scss">
.footer-bottom {
  @apply tw-bg-pv-grey-32;

  &__wrapper {
    @apply tw-p-1 md:tw-p-6;
    max-width: 1440px;
    margin: 0 auto;
  }

  &__copyright {
    @apply tw-col-span-12 md:tw-col-span-3 lg:tw-col-span-8;
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
