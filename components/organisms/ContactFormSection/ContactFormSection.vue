<template>
  <div class="contact-form-section">
    <div class="contact-form-section__left-side">
      <NuxtDynamic
        v-for="entry in requestForms"
        :key="entry._uid"
        v-editable="entry"
        v-bind="entry"
        :name="entry.uiComponent || entry.component"
      />
    </div>
    <div class="contact-form-section__right-side">
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
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-relative;
  @apply tw-w-full;
  @apply tw-mt-16;

  @screen lg {
    @apply tw-flex-row;
  }

  &__left-side {
    @apply tw-w-full;

    @screen lg {
      @apply tw-w-1/2;
    }
  }

  &__right-side {
    @apply tw-w-full;
    @apply tw-mt-8;

    @screen lg {
      @apply tw-w-1/2;
      @apply tw-mt-0;
      @apply tw-ml-12;
    }

    @screen xl {
      margin-left: 149px;

      // ToDo: clarify if design intended spacing from tailwind or added custom spacing on purpose
      // @apply tw-ml-36; / 144px
    }
  }
}
</style>
