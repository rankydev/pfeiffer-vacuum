<template>
  <div v-editable="(headline, richtext, buttons)">
    <div>Test</div>
    <h2 v-if="headline">
      {{ headline }}
    </h2>

    <NuxtDynamic
      v-for="item in richtext"
      :key="item._uid"
      v-bind="item"
      :component="item.uiComponent || item.component"
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

<style lang="scss"></style>
