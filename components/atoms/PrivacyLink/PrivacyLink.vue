<template>
  <div class="privacy-link" @click="openConsentLayer()">
    <span>{{ label }}</span>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PrivacyLink',
  props: {
    /**
     * The label of the link. Optional, can be used instead of providing content for the template slot.
     */
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { app } = useContext()

    const openConsentLayer = () => {
      if (process.client && !!window?.UC_UI && window?.UC_UI.isInitialized()) {
        const locale = app?.i18n.locale
        window?.UC_UI.updateLanguage(locale)
        window?.UC_UI.showSecondLayer()
      }
    }

    return {
      openConsentLayer,
    }
  },
})
</script>

<style lang="scss">
.privacy-link {
  @apply tw-transition-colors;
  @apply tw-duration-300;
  @apply tw-ease-out;
  @apply tw-leading-6;
  @apply tw-cursor-pointer;
  @apply hover:tw-underline;
}
</style>
