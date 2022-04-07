<template>
  <button
    class="button"
    :class="[
      `button--${variant}`,
      `button--${size}`,
      `button--${isPrimary ? 'filled' : shape}`,
      {
        'button--disabled': disabled,
        'button--icon-only': !label,
      },
    ]"
    :disabled="disabled"
  >
    <span v-if="label" class="button__label">{{ label }}</span>
    <Icon
      v-if="icon"
      :icon="icon"
      :size="iconSize"
      :class="{
        'button__icon--prepend': label && prependIcon,
        'button__icon--append': label && !prependIcon,
      }"
    />
    <template v-if="!icon && !label">&nbsp;&nbsp;</template>
  </button>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    /**
     * The text displayed at the button
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * The icon dispalyed at the button
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * Prepends the icon instead of appending it
     */
    prependIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * The button variant
     * @values primary, secondary, inverted
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (val) => ['primary', 'secondary', 'inverted'].includes(val),
    },
    /**
     * Defines the button shape
     * * @values filled, outlined, plain
     */
    shape: {
      type: String,
      default: 'filled',
      validator: (val) => ['filled', 'outlined', 'plain'].includes(val),
    },
    /**
     * The size of the component
     * @values xsmall, small, normal
     */
    size: {
      type: String,
      default: 'normal',
      validator: (val) => ['xsmall', 'small', 'normal'].includes(val),
    },
    /*
     * Set if the button is clickable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const iconSize = computed(() =>
      props.size === 'xsmall' ? 'xsmall' : 'base'
    )

    const isPrimary = computed(() => props.variant === 'primary')

    return {
      isPrimary,
      iconSize,
    }
  },
})
</script>

<style lang="scss">
.button {
  all: unset;

  @apply tw-rounded-md;
  @apply tw-inline-flex;
  @apply tw-items-center;
  @apply tw-cursor-pointer;
  @apply tw-font-bold;
  @apply tw-whitespace-nowrap;

  &--disabled {
    @apply tw-cursor-default;
  }

  &--normal {
    @apply tw-py-3 tw-px-4;
    @apply tw-leading-6;
    @apply tw-text-base;

    &.button--icon-only {
      @apply tw-px-3;
    }
  }

  &--small {
    @apply tw-py-2 tw-px-3;
    @apply tw-leading-6;
    @apply tw-text-sm;

    &.button--icon-only {
      @apply tw-px-2;
    }
  }

  &--xsmall {
    @apply tw-py-2 tw-px-3;
    @apply tw-leading-4;
    @apply tw-text-sm;

    &.button--icon-only {
      @apply tw-px-2;
    }
  }

  &--filled {
    &.button--primary {
      @apply tw-bg-pv-yellow;
      @apply tw-text-pv-grey-16;
      @apply tw-shadow-button;

      &:hover,
      &:focus {
        @apply tw-bg-pv-yellow-lighter;
      }
    }

    &.button--secondary {
      @apply tw-bg-pv-red;
      @apply tw-text-pv-white;
      @apply tw-shadow-button;

      &:hover,
      &:focus {
        @apply tw-bg-pv-red-lighter;
      }
    }

    &.button--inverted {
      @apply tw-bg-pv-white;
      @apply tw-text-pv-black;
      @apply tw-shadow-button-inverted;

      &:hover,
      &:focus {
        @apply tw-text-pv-grey-32;
      }
    }

    &.button--disabled,
    &.button--disabled:hover,
    &.button--disabled:focus {
      @apply tw-bg-pv-grey-80;
      @apply tw-text-pv-grey-96;
      @apply tw-shadow-none;

      &.button--inverted {
        @apply tw-bg-pv-grey-64;
        @apply tw-text-pv-grey-80;
      }
    }
  }

  &--outlined {
    @apply tw-outline;
    @apply tw-outline-2;
    @apply tw--outline-offset-2;

    &.button--secondary {
      @apply tw-outline-pv-red;
      @apply tw-text-pv-red;

      &:hover,
      &:focus {
        @apply tw-outline-pv-red-lighter;
        @apply tw-text-pv-red-lighter;
        @apply tw-bg-pv-red-lighter;
        @apply tw-bg-opacity-10;
      }
    }

    &.button--inverted {
      @apply tw-outline-pv-grey-96;
      @apply tw-text-pv-grey-96;

      &:hover,
      &:focus {
        @apply tw-outline-pv-white;
        @apply tw-text-pv-white;
        @apply tw-bg-pv-white;
        @apply tw-bg-opacity-10;
      }
    }

    &.button--disabled,
    &.button--disabled:hover,
    &.button--disabled:focus {
      @apply tw-outline-pv-grey-80;
      @apply tw-bg-pv-transparent;
      @apply tw-text-pv-grey-80;

      &.button--inverted {
        @apply tw-outline-pv-grey-48;
        @apply tw-bg-pv-transparent;
        @apply tw-text-pv-grey-48;
      }
    }
  }

  &--plain {
    @apply tw-bg-pv-transparent;
    @apply tw-px-0;

    &.button--secondary {
      @apply tw-text-pv-red;

      &:hover,
      &:focus {
        @apply tw-text-pv-red-lighter;
      }
    }

    &.button--inverted {
      @apply tw-text-pv-grey-96;

      &:hover,
      &:focus {
        @apply tw-text-pv-white;
      }
    }

    &.button--disabled,
    &.button--disabled:hover,
    &.button--disabled:focus {
      @apply tw-text-pv-grey-80;

      &.button--inverted {
        @apply tw-text-pv-grey-48;
      }
    }
  }

  &__icon {
    &--prepend {
      @apply tw-order-first;

      .button--normal > & {
        @apply tw-mr-5;
      }

      .button--small > & {
        @apply tw-mr-4;
      }

      .button--xsmall > & {
        @apply tw-mr-3;
      }
    }

    &--append {
      .button--normal > & {
        @apply tw-ml-4;
      }

      .button--small > & {
        @apply tw-ml-3;
      }

      .button--xsmall > & {
        @apply tw-ml-3;
      }
    }
  }
}
</style>
