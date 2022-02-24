<template>
  <section class="footer-bottom tw-grid-container">
    <language-switcher class="footer-bottom__language" />
    <div class="footer-bottom__copyright tw-text-inverse">
      <p>{{ copyright }}</p>
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
  @apply tw-p-1 md:tw-p-6;

  &__language {
    @apply tw-col-span-12 md:tw-col-span-1 lg:tw-col-span-2;
    @apply tw-text-pv-white;
  }

  &__copyright {
    @apply tw-col-span-12 md:tw-col-span-3 lg:tw-col-span-8;
  }
}
</style>
