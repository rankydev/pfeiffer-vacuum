<template>
  <div class="contactFormSection">
    <div class="contactFormSection__wrapper">
      <div class="contactFormSection__wrapper--left-side">
        <NuxtDynamic
          v-for="entry in requests"
          :key="entry._uid"
          v-editable="entry"
          class="request-entries"
          v-bind="entry"
          :name="entry.uiComponent || entry.component"
        />
      </div>
      <div class="contactFormSection__wrapper--right-side">
        {{ headline }}
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
     * Headline of the carousel
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * Button which will be displayed above the carousel
     */
    requests: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return {}
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
