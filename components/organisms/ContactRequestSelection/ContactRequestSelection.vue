<template>
  <div class="contact-request-selection">
    <div class="contact-request-selection__content">
      <h1 class="contact-request-selection__main-headline">
        {{ mainHeadline }}
      </h1>
      <h3 class="contact-request-selection__section-headline">
        {{ sectionHeadline }}
      </h3>
      <p class="tw-teaser contact-request-selection__text">
        {{ text }}
      </p>
    </div>
    <div class="contact-request-selection__subjects">
      <NuxtDynamic
        v-for="item in requestSubjects"
        v-show="selectedSubjectId === item._uid || !selectedSubjectId"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
        @selected="changeSelection"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContactRequestSelection',
  props: {
    /**
     * main headline rendred as h1
     */
    mainHeadline: {
      type: String,
      default: '',
    },
    /**
     * headline of the section rendred as h3
     */
    sectionHeadline: {
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
     * the list of request subjects
     */
    requestSubjects: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const selectedSubjectId = ref(undefined)
    const changeSelection = (id) => {
      selectedSubjectId.value = id
    }

    return { changeSelection, selectedSubjectId }
  },
})
</script>

<style lang="scss">
.contact-request-selection {
  &__content {
    @apply tw-mb-4;
  }

  &__main-headline {
    @apply tw-mb-8;
  }

  .section-headline {
    @apply tw-mb-4;
  }

  &__subjects {
    @apply tw-grid;
    @apply tw-gap-2;
  }
}
</style>
