<template>
  <section class="footer-navigation tw-grid-container">
    <div
      v-for="(menu, index) in footerNavigation.footerNavigation.footerMenus"
      :key="index"
      class="footer-navigation__block"
    >
      <link-list :title="menu.title" :link-list="menu.links" />
    </div>
    <newsletter-input
      class="footer-navigation__block footer-navigation__block--newsletter"
      :title="footerNavigation.footerNavigation.newsletter.title"
      :text="footerNavigation.footerNavigation.newsletter.text"
      :form="{ placeholder: 'E-Mail', buttonText: 'Absenden' }"
    />
  </section>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import LinkList from '~/components/molecules/LinkList/LinkList'
import NewsletterInput from '~/components/molecules/NewsletterInput/NewsletterInput'

export default defineComponent({
  name: 'PvFooterNavigation',
  components: { NewsletterInput, LinkList },
  props: {
    footerNavigation: {
      type: Object,
      default: () => {},
    },
  },
})

const footerNavigation = computed(() => props.footerNavigation)
</script>

<style lang="scss">
.footer-navigation {
  @apply tw-p-1 md:tw-p-6;

  &__block {
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-4;
    }

    @screen lg {
      @apply tw-col-span-3;
    }

    &--newsletter {
      @screen md {
        @apply tw-col-span-12;
      }

      @screen lg {
        @apply tw-col-span-3;
      }
    }
  }
}
</style>
