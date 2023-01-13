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
  emits: ['click'],
  props: {
    ...propsData,
    internalVariant: {
      type: String,
      default: 'facets',
      validator: (val) => ['facets'].includes(val),
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { internalVariant, active } = toRefs(props)

    const classList = computed(() => {
      console.log('######', active)
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
    }
  }
}
</style>
