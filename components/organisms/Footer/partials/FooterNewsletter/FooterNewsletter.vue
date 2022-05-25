<template>
  <div v-editable="(headline, richtext, buttons)" class="newsletter">
    <h2 v-if="headline" class="newsletter__headline">
      {{ headline }}
    </h2>

    <NuxtDynamic
      v-for="item in richtext"
      :key="item._uid"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />

    <div v-if="buttons.length">
      <Button v-for="button in buttons" :key="button._uid" v-bind="button" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FooterNewsletter',
  components: {},
  props: {
    /**
     * This is a headline
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * richtext element, containing the description
     */
    richtext: {
      type: Array,
      default: () => [],
    },
    /**
     * This is a button
     */
    buttons: {
      type: Array,
      default: () => [],
    },
    /**
     * This is a button
     */
    links: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.newsletter {
  @apply tw-grid tw-gap-4;
  @apply tw-col-span-full;

  &__headline {
    @apply tw-text-pv-white;
    @apply tw-text-base;
    @apply tw-leading-6;
  }
}
</style>
