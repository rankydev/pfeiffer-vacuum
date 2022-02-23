<template>
  <section class="footer-navigation tw-grid-container">
    <div
      v-for="(menu, index) in footerNavigation.footerNavigation.footerMenus"
      :key="index"
      class="footer-navigation__block"
    >
      <link-list :link-list="menu" />
    </div>
    <div class="footer-navigation__block footer-navigation__block--newsletter">
      <h5 class="tw-text-inverse">
        {{ footerNavigation.footerNavigation.newsletter.title }}
      </h5>
      <p class="tw-text-inverse tw-teaser">
        {{ footerNavigation.footerNavigation.newsletter.text }}
      </p>
      <input type="text" placeholder="E-Mail" />
      <button>Send</button>
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
    @apply tw-col-span-12 md:tw-col-span-4 lg:tw-col-span-3;

    &--newsletter {
      @apply md:tw-col-span-12 lg:tw-col-span-3;
    }
  }
}
</style>
