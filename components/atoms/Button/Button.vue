<template>
  <component
    :is="href || anchor ? 'Link' : 'button'"
    v-bind="(href || anchor) && { href, anchor, target }"
    class="button"
    :class="[
      `button--${variant}`,
      `button--${size}`,
      `button--cutaway-${cutaway}`,
      `button--${isPrimary ? 'filled' : shape}`,
      {
        'button--disabled': disabled,
        'button--icon-only': !label,
        'button--no-linebreaks': !allowLabelLineBreak,
        'button--text-center': textCenter,
      },
      `button--gap-${gap}`,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
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
import { computed, defineComponent } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import propsData from './partials/props.js'

export default defineComponent({
  components: {
    Icon,
    Link,
  },
  props: propsData,
  emits: ['click'],
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
  @apply tw-basis-full;
  @apply tw-justify-between;
  @apply tw-text-left;

  @screen md {
    flex-basis: auto;
  }

  &--text-center {
    @apply tw-justify-center;
  }

  &--no-linebreaks {
    @screen md {
      @apply tw-whitespace-nowrap;
    }
  }

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

      span {
        @apply tw-text-pv-grey-16;
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

      span {
        @apply tw-text-pv-white;
      }
    }

    &.button--variant-selection-preselected,
    &.button--variant-selection {
      @apply tw-bg-pv-red;
      @apply tw-text-pv-white;
      @apply tw-shadow-button;

      &:hover {
        @apply tw-bg-pv-red-lighter;
      }

      span {
        @apply tw-text-pv-white;
      }
    }

    &.button--variant-selection-preselected {
      @apply tw-shadow-border-red;
      @apply tw-bg-pv-white;
      @apply tw-text-pv-black;

      &:hover {
        @apply tw-shadow-border-red-lighter;
        @apply tw-text-pv-white;
      }

      span {
        @apply tw-text-pv-black;

        &:hover {
          @apply tw-text-pv-white;
        }
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

      span {
        @apply tw-text-pv-black;

        &:hover,
        &:focus {
          @apply tw-text-pv-grey-32;
        }
      }
    }

    &.button--disabled,
    &.button--disabled:hover,
    &.button--disabled:focus {
      @apply tw-bg-pv-grey-80;
      @apply tw-text-pv-grey-96;
      @apply tw-shadow-none;

      span {
        @apply tw-text-pv-grey-96;
      }

      &.button--inverted {
        @apply tw-bg-pv-grey-64;
        @apply tw-text-pv-grey-80;

        span {
          @apply tw-text-pv-grey-80;
        }
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

      span {
        @apply tw-text-pv-red;

        &:hover,
        &:focus {
          @apply tw-text-pv-red-lighter;
        }
      }
    }

    &.button--variant-selection-preselected,
    &.button--variant-selection {
      @apply tw-shadow-border-grey-80;
      @apply tw-bg-pv-white;

      &:hover {
        @apply tw-shadow-border-red-lighter;
        @apply tw-bg-pv-red-lighter;
        @apply tw-text-pv-white;
      }

      span {
        &:hover {
          @apply tw-text-pv-white;
        }
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

      span {
        @apply tw-text-pv-grey-96;

        &:hover,
        &:focus {
          @apply tw-text-pv-white;
        }
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

      span {
        @apply tw-text-pv-grey-80;

        &:hover,
        &:focus {
          @apply tw-text-pv-grey-48;
        }
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

      span {
        @apply tw-text-pv-red;

        &:hover,
        &:focus {
          @apply tw-text-pv-red-lighter;
        }
      }
    }

    &.button--inverted {
      @apply tw-text-pv-grey-96;

      &:hover,
      &:focus {
        @apply tw-text-pv-white;
      }

      span {
        @apply tw-text-pv-grey-96;

        &:hover,
        &:focus {
          @apply tw-text-pv-white;
        }
      }
    }

    &.button--disabled,
    &.button--disabled:hover,
    &.button--disabled:focus {
      @apply tw-text-pv-grey-80;

      span {
        @apply tw-text-pv-grey-80;
      }

      &.button--inverted {
        @apply tw-text-pv-grey-48;

        span {
          @apply tw-text-pv-grey-48;
        }
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

  &--cutaway-bottom {
    @apply tw-rounded-b-none;
  }

  &--gap {
    &-normal {
      &.button--normal {
        @apply tw-gap-4;
      }

      &.button--small {
        @apply tw-gap-3;
      }

      &.button--xsmall {
        @apply tw-gap-3;
      }
    }

    &-narrow {
      @apply tw-gap-2;
    }
  }

  // TODO: comment in if we want label text centered, too (multiline)
  // &__label {
  //   @apply tw-text-center;
  // }
  &__icon {
    &--prepend {
      @apply tw-order-first;
    }
  }
}
</style>
