<template>
  <!-- TODO: Clarify if sticky buttons shall be fixed on the sites right edge or within the ContentWrapper -->
  <!-- <ContentWrapper class="sticky-bar"> -->
  <div class="sticky-bar">
    <div class="sticky-bar__content">
      <Button
        class="sticky-bar__btn-icon sticky-bar__btn-shop"
        label="Shop"
        href="/de/shop/categories"
      />
      <Button
        class="sticky-bar__btn-icon"
        variant="secondary"
        icon="mail_outline"
        href="/de/contact"
      />
      <Button
        class="sticky-bar__btn-full"
        label="Kontakt"
        variant="secondary"
        icon="mail_outline"
        href="/de/contact"
      />
    </div>
  </div>
  <!-- </ContentWrapper> -->
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
// import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper.vue'

export default defineComponent({
  components: {
    Button,
    // ContentWrapper,
  },
  props: {},
  setup(props) {},
})
</script>

<style lang="scss">
.sticky-bar {
  @apply tw-relative;
  @apply tw-flex;
  @apply tw-justify-end;

  &__content {
    @apply tw-items-end;
    @apply tw-fixed;
    @apply tw-flex;
    @apply tw-mr-4;
    bottom: 0;
    z-index: 100;

    @screen md {
      @apply tw-mr-6;
    }

    @screen lg {
      @apply tw-mr-8;
    }
  }

  &__btn-shop {
    @apply tw-mr-2;
  }

  &__btn-icon {
    @apply tw-flex;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__btn-full {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
    }
  }
}
</style>
