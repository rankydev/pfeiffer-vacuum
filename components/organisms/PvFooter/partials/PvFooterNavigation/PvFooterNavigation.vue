<template>
  <section class="footer-navigation tw-grid-container">
    <div class="footer-navigation__block">
      <h3 class="tw-text-inverse">Menu 1</h3>
    </div>
    <div class="footer-navigation__block">
      <h3 class="tw-text-inverse">Menu 2</h3>
    </div>
    <div class="footer-navigation__block">
      <h3 class="tw-text-inverse">Menu 3</h3>
    </div>
    <div class="footer-navigation__block footer-navigation__block--newsletter">
      <h3 class="tw-text-inverse">Newsletter</h3>
      <p class="tw-text-inverse tw-teaser">
        Sie möchten über aktuelle News von Pfeiffer Vacuum informiert werden?
        Dann abonnieren Sie unseren Newsletter.
      </p>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PvFooterNavigation',
  props: {},
  setup() {
    return {}
  },
})
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
