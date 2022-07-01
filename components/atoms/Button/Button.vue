<template>
  <component
    :is="href ? 'Link' : 'button'"
    v-bind="href && { href, target }"
    class="button"
    :class="[
      `button--${variant}`,
      `button--${size}`,
      `button--cutaway-${cutaway}`,
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
    <!-- This makes sure there is at least whitespace as
    content in the button if no icon or label are provided -->
    <template v-if="!icon && !label">&nbsp;&nbsp;</template>
  </component>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'

export default defineComponent({
  components: {
    Icon,
    Link,
  },
  props: {
    /**
     * The text displayed at the button
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * The icon displayed at the button
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
     * @values filled, outlined, plain
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
    /**
     * Set if the button is clickable
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Defines the button shape cutaway in a side e.g. for slider controls
     * @values left, right
     */
    cutaway: {
      type: String,
      default: 'none',
      validator: (val) => ['none', 'left', 'right'].includes(val),
    },
    /**
     * Defines button link if needed
     */
    href: {
      type: String,
      default: '',
    },
    /**
     * Target can be defined for button link
     * @values _self, _blank
     */
    target: {
      type: String,
      default: '_self',
      validator: (val) => ['_self', '_blank'].includes(val),
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
  @apply tw-rounded-md;
  @apply tw-inline-flex;
  @apply tw-items-center;
  @apply tw-cursor-pointer;
  @apply tw-font-bold;
  @apply tw-whitespace-nowrap;
  @apply tw-justify-between;

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
    @apply tw-rounded-md;

    &.button--secondary {
      @apply tw-text-pv-red;
      @apply tw-shadow-border-red;

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
      @apply tw-shadow-border-white;

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
      @apply tw-shadow-border-grey-80;
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

  &--cutaway-left {
    @apply tw-rounded-r-none;
    @apply tw-rounded-l-md;
  }

  &--cutaway-right {
    @apply tw-rounded-l-none;
    @apply tw-rounded-r-md;
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
