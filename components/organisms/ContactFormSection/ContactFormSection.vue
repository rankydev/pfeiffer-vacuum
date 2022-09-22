<template>
  <div class="contact-form-section tw-column-view">
    <div class="tw-column-view--left-side">
      <NuxtDynamic
        v-for="entry in requestForms"
        :key="entry._uid"
        v-editable="entry"
        v-bind="entry"
        :name="entry.uiComponent || entry.component"
      />
    </div>
    <div class="tw-column-view--right-side">
      <NuxtDynamic
        v-for="entry in contactPersons"
        :key="entry._uid"
        v-editable="entry"
        v-bind="entry"
        :name="entry.uiComponent || entry.component"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
// ToDo: only for moch purpose until contactPerson Component is defined
import richtext from '~/components/atoms/Richtext/Richtext.stories.content.js'

export default defineComponent({
  name: 'ContactFormSection',
  components: {},
  props: {
    /**
     * Array of requestForms rendered on the left side
     */
    requestForms: {
      type: Array,
      default: () => [],
    },
    /**
     * Array of contact details for contact persons rendered on the right side
     */
    contactPersons: {
      type: Array,
      default: () => [richtext.content],
    },
  },
})
</script>
<style lang="scss">
.contact-form-section {
  @apply tw-mb-4;
  @apply tw-pt-6;

  @screen md {
    @apply tw-pt-4;
  }

  @screen lg {
    @apply tw-pt-12;
  }
}
</style>
