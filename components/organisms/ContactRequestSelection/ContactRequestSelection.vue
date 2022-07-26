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
      <AnimatedCollapse
        v-for="item in requestSubjects"
        :key="item._uid"
        speed="fast"
      >
        <NuxtDynamic
          v-show="selectedSubjectId === item._uid || !selectedSubjectId"
          v-editable="item"
          v-bind="item"
          class="contact-request-selection__subject"
          :name="item.uiComponent || item.component"
          @selected="changeSelection"
        />
      </AnimatedCollapse>
    </div>
    <AnimatedCollapse speed="fast">
      <div v-if="formType.length" class="contact-request-selection__form">
        <NuxtDynamic
          v-for="item in formType"
          :key="item._uid"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </div>
    </AnimatedCollapse>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'

export default defineComponent({
  name: 'ContactRequestSelection',
  components: { AnimatedCollapse },
  props: {
    /**
     * main headline rendered as h1
     */
    mainHeadline: {
      type: String,
      default: '',
    },
    /**
     * headline of the section rendered as h3
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
    const formType = ref([])
    const changeSelection = (data) => {
      selectedSubjectId.value = data.id || undefined
      formType.value = data.type || []
    }
    return { changeSelection, selectedSubjectId, formType }
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

  &__subject {
    @apply tw-overflow-hidden;
  }

  &__form {
    @apply tw-mt-4;
    @apply tw-overflow-hidden;
  }
}
</style>
