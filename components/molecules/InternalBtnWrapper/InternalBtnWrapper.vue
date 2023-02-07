<template>
  <Button v-bind="{ ...props }" :class="classList" @click="$emit('click')" />
</template>

<script>
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import propsData from '~/components/atoms/Button/partials/props.js'

export default defineComponent({
  name: 'InternalBtnWrapper',
  components: {
    Button,
  },
  props: {
    ...propsData,
    internalVariant: {
      type: String,
      default: 'facets',
      validator: (val) => ['facets', 'language-switcher'].includes(val),
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  setup(props) {
    const { internalVariant, active } = toRefs(props)

    const classList = computed(() => {
      if (!active.value) return `internal-btn-wrapper__${internalVariant.value}`
      return `internal-btn-wrapper__${internalVariant.value} internal-btn-wrapper__${internalVariant.value}--active`
    })
    return {
      props,
      classList,
    }
  },
})
</script>

<style lang="scss">
.internal-btn-wrapper {
  &__facets {
    &.button--outlined.button--secondary {
      @apply tw-p-2;
      @apply tw-text-xs;
      @apply tw-font-normal;
      @apply tw-text-pv-grey-64;
      -webkit-text-fill-color: #a3a3a3;
      @apply tw-shadow-border-grey-80;

      &:hover,
      &:focus {
        @apply tw-bg-pv-white;
        @apply tw-outline-pv-transparent;
      }

      &:focus {
        @apply tw-shadow-border-grey-16;
      }
    }

    &--active.button--outlined.button--secondary {
      @apply tw-text-pv-grey-16;
      -webkit-text-fill-color: #292929;
    }
  }

  &__language-switcher {
    color: var(--pv-white) !important;
    -webkit-text-fill-color: var(--pv-white) !important;
    @apply tw-p-0;
    @apply tw-align-middle;
    box-shadow: none !important;
    font-size: 0.75rem !important;

    @screen lg {
      color: var(--pv-grey-48) !important;
      -webkit-text-fill-color: var(--pv-grey-48) !important;
    }

    &:hover {
      background-color: unset !important;
    }
  }

  &__language-switcher.button--small {
    @apply tw-px-0;
    @apply tw-pb-0;
  }
}
</style>
