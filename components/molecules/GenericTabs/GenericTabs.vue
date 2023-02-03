<template>
  <div
    class="generic-tabs"
    :class="{ 'generic-tabs--center-mode': centerMode }"
  >
    <div v-if="!isMobile" class="generic-tabs__wrapper">
      <div class="generic-tabs__desktop">
        <InternalBtnWrapper
          v-for="(tab, index) in tabs"
          :key="index"
          :label="tab.name"
          :variant="activeTab === tab.trigger ? 'secondary' : 'inverted'"
          cutaway="bottom"
          internal-variant="tab-item"
          text-center
          :disabled="tab.disabled"
          class="generic-tabs__desktop__item"
          @click="selectTab(tab.trigger)"
        />
      </div>
      <div class="generic-tabs__desktop__content">
        <slot name="activeTabContent" />
      </div>
    </div>
    <GenericAccordion
      v-else
      :accordion-entries="mobileAccordionItems"
      level="h3"
      variant="tab"
      class="generic-tabs__mobile"
      @activeTabChange="selectTab"
    >
      <template v-for="item in mobileAccordionItems" #[item.slotName]>
        <slot name="activeTabContent" />
      </template>
    </GenericAccordion>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  computed,
  toRefs,
} from '@nuxtjs/composition-api'
import InternalBtnWrapper from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'

export default defineComponent({
  components: {
    InternalBtnWrapper,
    GenericAccordion,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: String,
      required: true,
    },
    centerMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selectTab'],
  setup(props, { emit }) {
    const { app } = useContext()
    const { isMobile } = app.$breakpoints
    const { tabs } = toRefs(props)

    const mobileAccordionItems = computed(() => {
      return tabs.value.map((item) => {
        return {
          ...item,
          label: item.name,
          isActive: true, // no initial open tab
          slotName: item.trigger,
        }
      })
    })

    const selectTab = (code) => {
      emit('selectTab', code)
    }

    return {
      mobileAccordionItems,
      selectTab,
      isMobile,
    }
  },
})
</script>

<style lang="scss" scoped>
.generic-tabs {
  $root: &;
  @apply tw-w-full;

  &__desktop {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
      @apply tw-flex-row;
      @apply tw-justify-start;
      @apply tw-border-b-2;
      @apply tw-border-pv-red;
      @apply tw-w-full;
      @apply tw-overflow-y-auto;
      @apply tw-gap-2;
    }

    &__content {
      @apply tw-hidden;

      @screen md {
        @apply tw-block;
      }
    }
  }

  &--center-mode {
    #{$root}__desktop {
      @screen md {
        @apply tw-justify-center;

        &__item {
          min-width: 120px;
        }
      }
    }
  }

  &__mobile {
    @apply tw-flex;
    @apply tw-justify-evenly;
    @apply tw-flex-col;

    &__item {
      @apply tw-mt-2;
    }
  }
}
</style>
