<template>
  <div class="contact-request-selection">
    <div class="contact-request-selection__content">
      <h1>{{ mainHeadline }}</h1>
      <h3>{{ selectionHeadline }}</h3>
      <p class="tw-teaser">{{ text }}</p>
    </div>
    <div class="contact-request-selection__subjects">
      <NuxtDynamic
        v-for="item in contactRequests"
        :key="item._uid"
        v-editable="item"
        class="accordionTest"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  // components: { Richtext },
  props: {
    /**
     * main headline rendred as h1
     */
    mainHeadline: {
      type: String,
      default: '',
    },
    /**
     * headline of the selection rendred as h3
     */
    selectionHeadline: {
      type: String,
      default: '',
    },
    /**
     * text above the selection
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * the list of contact accordions
     */
    contactRequests: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {},
})
</script>

<style lang="scss">
.contact-request-selection {
  &__content {
    @apply tw-mb-4;
    @apply tw-mt-16;

    h1 {
      @apply tw-mb-8;
    }

    h3 {
      @apply tw-mb-4;
    }
  }

  &__subjects {
    @apply tw-grid;
    @apply tw-gap-2;
  }
}
</style>
