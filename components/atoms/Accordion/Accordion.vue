<template>
  <GenericAccordion
    :accordion-entries="mappedAccordionEntries"
    :level="level"
    :multiple="multiple"
    class="accordion-cms-content"
  >
    <template
      v-for="accordionItem in mappedAccordionEntries"
      #[accordionItem.slotName]
    >
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <NuxtDynamic
        v-for="item in accordionItem.items"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </template>
  </GenericAccordion>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'

export default defineComponent({
  components: {
    GenericAccordion,
  },
  props: {
    /**
     * List of accordion elements
     */
    accordionEntries: {
      type: Array,
      default: () => [],
    },
    /**
     * The heading tag
     */
    level: {
      type: String,
      default: 'paragraph',
      validator: (val) => ['h3', 'paragraph'].includes(val),
    },
    /**
     * Allow multiple open items at the same time
     */
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const mappedAccordionEntries = computed(() => {
      return props.accordionEntries.map((item, index) => {
        return {
          ...item,
          slotName: index,
        }
      })
    })

    return {
      mappedAccordionEntries,
    }
  },
})
</script>

<style lang="scss">
.accordion-cms-content {
  .paragraph-section,
  .image-with-description,
  .button {
    @apply tw-mb-4;

    @screen md {
      @apply tw-mb-6;
    }
  }
}
</style>
