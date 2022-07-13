<template>
  <div class="contact-cta-box">
    <h4 class="contact-cta-box__headline">{{ headline }}</h4>
    <NuxtDynamic
      v-for="item in description"
      :key="item._uid"
      class="contact-cta-box__description"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
    <NuxtDynamic
      v-for="item in button"
      :key="item._uid"
      class="contact-cta-box__button"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
  </div>
</template>
<script>
export default {
  name: 'ContactCTABox',
  props: {
    headline: {
      type: String,
      default: '',
    },
    description: {
      type: Array,
      default: () => [],
    },
    button: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="scss">
.contact-cta-box {
  @apply tw-bg-pv-grey-96;
  @apply tw-p-6;
  @apply tw-rounded-md;

  &__headline,
  &__description {
    @apply tw-mb-4;
  }
}
</style>
