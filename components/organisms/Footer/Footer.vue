<template>
  <footer class="footer">
    <social-media
      v-if="footerTop.socialMedia"
      class="footer__top"
      :social-media-channels="footerTop.socialMedia"
    />
    <pv-footer-navigation
      class="footer__middle"
      :footer-navigation="footerNavigation"
    />
    <pv-footer-bottom
      class="footer__bottom"
      :copyright="footerBottom.copyright"
    />
  </footer>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import PvFooterNavigation from './partials/FooterNavigation/FooterNavigation'
import PvFooterBottom from './partials/FooterBottom/FooterBottom'

export default defineComponent({
  name: 'Footer',
  components: { SocialMedia, PvFooterNavigation, PvFooterBottom },
  props: {
    /**
     * Social Media Channels on top of the footer.
     */
    footerTop: {
      type: Object,
      default() {
        return {
          socialMedia: true,
        }
      },
    },
    /**
     * List of LinkLists with titles and newsletter block
     */
    footerNavigation: {
      type: Object,
      default() {},
    },
    /**
     *
     */
    footerBottom: {
      type: Object,
      default() {
        return {
          copyright: '',
        }
      },
      copyright: {
        type: String,
        default: '',
      },
    },
  },
  setup(props) {},
})
</script>

<style lang="scss">
.footer {
  @apply tw-container;

  &__top {
    @apply tw-items-center;
  }

  &__middle {
    @apply tw-bg-pv-grey-32;
    @apply tw-text-pv-white;

    .link-list__title {
      @apply tw-text-pv-white;
    }
  }

  &__bottom {
    @apply tw-bg-pv-grey-32;
  }
}
</style>
