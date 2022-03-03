<template>
  <footer class="footer tw-col-span-full">
    <SocialMedia
      v-if="socialMedia"
      class="footer__top"
      :social-media="socialMedia"
    />

    <FooterNavigation
      class="footer__middle"
      :footer-navigation-columns="footerNavigationColumns"
      :newsletter="newsletter"
    />
    <FooterBottom class="footer__bottom" :copyright="copyright" />
  </footer>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SocialMedia from './partials/SocialMedia/SocialMedia'
import FooterNavigation from './partials/FooterNavigation/FooterNavigation'
import FooterBottom from './partials/FooterBottom/FooterBottom'

export default defineComponent({
  name: 'Footer',
  components: {
    SocialMedia,
    FooterNavigation,
    FooterBottom,
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
    footerNavigationColumns: {
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

<style lang="scss"></style>
