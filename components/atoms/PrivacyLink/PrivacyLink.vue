<template>
  <div class="privacy-link" @click="openConsentLayer()">
    <span>{{ label }}</span>
    <!-- <slot :isActive="false" :isExactActive="false">{{ label }}</slot> -->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

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
    let usercentricsInitialized = ref(null)
    let UC = null

    onMounted(() => {
      if (process.client) {
        UC = window?.UC_UI
        usercentricsInitialized = UC && UC.isInitialized()
      }
    })

    const openConsentLayer = () => {
      // UC.updateLanguage()
      UC.showSecondLayer()
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
