<template>
  <div class="top-navigation">
    <div
      class="top-navigation__spacer"
      :class="`top-navigation__spacer--length-${flyoutCount}`"
      @focus.capture="active = true"
      @blur.capture="active = false"
      @mouseenter="active = true"
      @mouseleave="active = false"
    >
      <div class="top-navigation__flyouts">
        <FlyoutEntry
          v-for="item in flyoutLinks"
          :key="item._uid"
          v-editable="item"
          class="top-navigation__flyout"
          v-bind="item"
          :active="active"
        />
      </div>
    </div>
    <LanguageSwitcher />
  </div>
</template>

<script>
import { toRefs, computed, defineComponent } from '@nuxtjs/composition-api'
import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher.vue'
import FlyoutEntry from '~/components/molecules/FlyoutEntry/FlyoutEntry.vue'

export default defineComponent({
  components: {
    LanguageSwitcher,
    FlyoutEntry,
  },
  props: {
    /**
     * The active value for flyout links
     * @model
     */
    value: {
      type: Boolean,
      default: false,
    },
    /**
     * A list of flyout links
     */
    flyoutLinks: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const flyoutCount = computed(() => {
      return props.flyoutLinks.length < 4 ? props.flyoutLinks.length : 4
    })

    const active = computed({
      get: () => props.value,
      set: (value) => emit('input', value),
    })

    return {
      active,
      flyoutCount,
    }
  },
})
</script>

<style lang="scss">
.top-navigation {
  @apply tw-flex;
  @apply tw-items-center;

  &__spacer {
    @apply tw-relative;
    @apply tw-h-12;

    &--length-1 {
      @apply tw-w-12;
    }

    &--length-2 {
      @apply tw-w-24;
    }

    &--length-3 {
      @apply tw-w-36;
    }

    &--length-4 {
      @apply tw-w-48;
    }
  }

  &__flyouts {
    @apply tw-flex;
    @apply tw-overflow-hidden;
    @apply tw-absolute;
    @apply tw-right-0;
    @apply tw-bg-pv-white;
    @apply tw-py-3;
    @apply tw-pl-3;
  }

  &__flyout {
    @apply tw-mr-6;
  }
}
</style>
