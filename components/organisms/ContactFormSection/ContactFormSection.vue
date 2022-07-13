<template>
  <div class="contactFormSection">
    <div class="contactFormSection__wrapper">
      <div class="contactFormSection__wrapper--left-side">
        <NuxtDynamic
          v-for="entry in requestForms"
          :key="entry._uid"
          v-editable="entry"
          class="request-entries"
          v-bind="entry"
          :name="entry.uiComponent || entry.component"
        />
      </div>
      <div class="contactFormSection__wrapper--right-side">
        <NuxtDynamic
          v-for="entry in contactPersons"
          :key="entry._uid"
          v-editable="entry"
          class="request-entries"
          v-bind="entry"
          :name="entry.uiComponent || entry.component"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
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
      default: () => [],
    },
  },
})
</script>
<style lang="scss">
.contactFormSection {
  &__wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-relative;
    @apply tw-w-full;
    @apply tw-mt-16;

    @screen lg {
      @apply tw-flex-row;
    }

    &--left-side {
      @apply tw-w-full;

      @screen lg {
        @apply tw-w-1/2;
      }
    }

    &--right-side {
      @apply tw-w-full;
      @apply tw-mt-8;

      @screen lg {
        @apply tw-w-1/2;
        @apply tw-mt-0;
        @apply tw-ml-12;
      }

      @screen xl {
        margin-left: 149px;

        // @apply tw-ml-36; / 144px
      }
    }
  }
}
</style>
