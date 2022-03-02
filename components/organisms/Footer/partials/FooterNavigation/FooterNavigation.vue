<template>
  <section class="footer-navigation">
    <div class="footer-navigation__content tw-grid-container">
      <div class="footer-navigation__content-menu">
        <div
          v-for="(menu, index) in footerMenus"
          :key="index"
          class="footer-navigation__menu-element"
        >
          <link-list :title="menu.title" :link-list="menu.links" />
        </div>
      </div>
      <!-- TODO: Will be resolved in PVWEB-347
    <newsletter-input
      class="footer-navigation__newsletter"
      :title="newsletter.newsletterContent.title"
      :text="newsletter.newsletterContent.text"
      :form="{ placeholder: 'E-Mail', buttonText: 'Absenden' }"
    />-->
      <div class="footer-navigation__content-newsletter">
        Newsletter Molecule
      </div>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import LinkList from '~/components/molecules/LinkList/LinkList'

export default defineComponent({
  name: 'PvFooterNavigation',
  components: { LinkList },
  props: {
    footerMenus: {
      type: Array,
      default: () => [],
    },
    newsletter: {
      type: Array,
      default: () => [],
    },
  },
})

const footerNavigation = computed(() => props.footerNavigation)
</script>

<style lang="scss">
.footer-navigation {
  @apply tw-p-1 md:tw-p-6 tw-bg-pv-grey-32 tw-text-pv-white;

  &__content {
    @apply tw-p-1 md:tw-p-6 tw-text-pv-white;
    max-width: 1440px;
    margin: 0 auto;
  }

  &__content-menu {
    @apply tw-col-span-full;

    @screen md {
      @apply tw-grid-rows-1 tw-gap-x-8;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

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

  &__content-newsletter {
    @apply tw-col-span-full;

    @screen lg {
      @apply tw-col-span-4;
    }
  }
}
</style>
