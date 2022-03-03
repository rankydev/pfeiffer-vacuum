<template>
  <button
    class="button"
    :class="[
      `button--${variant}`,
      `button--${size}`,
      {
        'button--filled': !outlined && !plain,
        'button--outlined': outlined && !plain,
        'button--plain': plain,
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
  </button>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
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
    /*
     * Button displayed as a border button
     */
    outlined: {
      type: Boolean,
      default: false,
    },
    /*
     * Button displayed without any border
     */
    plain: {
      type: Boolean,
      default: false,
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

    return {
      iconSize,
    }
  },
})
</script>

<style lang="scss">
.button {
  all: unset;

  @apply tw-border-2;
  @apply tw-border-solid;
  @apply tw-rounded-md;
  @apply tw-flex;
  @apply tw-items-center;
  @apply tw-cursor-pointer;
  @apply tw-font-bold;

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
    @apply tw-leading-5;
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
      @apply tw-border-pv-yellow;
      @apply tw-text-pv-grey-16;

      &:hover {
        @apply tw-bg-pv-yellow-lighter;
        @apply tw-border-pv-yellow-lighter;
      }
    }

    &.button--secondary {
      @apply tw-bg-pv-red;
      @apply tw-border-pv-red;
      @apply tw-text-pv-white;

      &:hover {
        @apply tw-bg-pv-red-lighter;
        @apply tw-border-pv-red-lighter;
      }
    }

    &.button--inverted {
      @apply tw-bg-pv-white;
      @apply tw-border-pv-white;
      @apply tw-text-pv-black;

      &:hover {
        @apply tw-text-pv-grey-32;
      }
    }

    &.button--disabled,
    &.button--disabled:hover {
      @apply tw-bg-pv-grey-80;
      @apply tw-border-pv-grey-80;
      @apply tw-text-pv-grey-96;

      &.button--inverted {
        @apply tw-bg-pv-grey-64;
        @apply tw-border-pv-grey-64;
        @apply tw-text-pv-grey-80;
      }
    }
  }

  &--outlined {
    &.button--primary {
      @apply tw-border-pv-yellow;
      @apply tw-text-pv-yellow;

      &:hover {
        @apply tw-border-pv-yellow-lighter;
        @apply tw-text-pv-yellow-lighter;
        @apply tw-bg-pv-yellow-lighter;
        @apply tw-bg-opacity-10;

        // background-color: rgba($pv-yellow-lighter, 10%);
      }
    }

    &.button--secondary {
      @apply tw-border-pv-red;
      @apply tw-text-pv-red;

      &:hover {
        @apply tw-border-pv-red-lighter;
        @apply tw-text-pv-red-lighter;
        @apply tw-bg-pv-red-lighter;
        @apply tw-bg-opacity-10;
      }
    }

    &.button--inverted {
      @apply tw-border-pv-grey-96;
      @apply tw-text-pv-grey-96;

      &:hover {
        @apply tw-border-pv-white;
        @apply tw-text-pv-white;
        @apply tw-bg-pv-white;
        @apply tw-bg-opacity-10;
      }
    }

    &.button--disabled,
    &.button--disabled:hover {
      @apply tw-border-pv-grey-80;
      @apply tw-text-pv-grey-80;

      &.button--inverted {
        @apply tw-border-pv-grey-48;
        @apply tw-text-pv-grey-48;
      }
    }
  }

  &--plain {
    @apply tw-border-pv-transparent;
    @apply tw-bg-pv-transparent;
    @apply tw-px-0;
    @apply tw-border-l-0 tw-border-r-0;

    &.button--primary {
      @apply tw-text-pv-yellow;

      &:hover {
        @apply tw-text-pv-yellow-lighter;
      }
    }

    &.button--secondary {
      @apply tw-text-pv-red;

      &:hover {
        @apply tw-text-pv-red-lighter;
      }
    }

    &.button--inverted {
      @apply tw-text-pv-grey-96;

      &:hover {
        @apply tw-text-pv-white;
      }
    }

    &.button--disabled,
    &.button--disabled:hover {
      @apply tw-text-pv-grey-80;

      &.button--inverted {
        @apply tw-text-pv-grey-48;
      }
    }
  }

  &__label {
    @apply tw--mt-0.5;
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
