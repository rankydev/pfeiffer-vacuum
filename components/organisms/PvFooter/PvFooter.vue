<template>
  <footer class="footer">
    <social-media
      v-if="footerTop.socialMedia"
      class="footer__top"
      :social-media="footerTop.socialMedia"
    />
    <pv-footer-navigation
      class="footer__middle"
      :menus="footerNavigation.menus"
      :newsletter="footerNavigation.newsletter"
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
import PvFooterNavigation from './partials/PvFooterNavigation/PvFooterNavigation'
import PvFooterBottom from './partials/PvFooterBottom/PvFooterBottom'

export default defineComponent({
  name: 'Footer',
  components: { SocialMedia, PvFooterNavigation, PvFooterBottom },
  props: {
    footerTop: {
      type: Object,
      default() {
        return {
          socialMedia: true,
        }
      },
    },
    footerNavigation: {
      type: Object,
      default() {
        return {
          menus: {},
          newsletter: {},
        }
      },
    },
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
    @apply tw-items-center;
  }

  &__bottom {
    @apply tw-bg-pv-grey-32;
  }
}
</style>
