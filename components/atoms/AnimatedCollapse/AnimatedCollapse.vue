<template>
  <transition
    :enter-active-class="`transition--enter-active transition--${direction} transition--${speed}`"
    :leave-active-class="`transition--leave-active transition--${direction} transition--${speed}`"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The direction of the collapse animation
     * @values vertical, horizontal
     */
    direction: {
      type: String,
      default: 'vertical',
      validator: (val) => ['vertical', 'horizontal'].includes(val),
    },
    /**
     * The speed of the animation
     * @values slow, medium, fast
     */
    speed: {
      type: String,
      default: 'medium',
      validator: (val) => ['slow', 'medium', 'fast'].includes(val),
    },
  },
  setup(props) {
    const cssValue = computed(() => {
      return props.direction === 'vertical' ? 'height' : 'width'
    })

    const cssValueCapitalised = computed(() => {
      return cssValue.value.charAt(0).toUpperCase() + cssValue.value.slice(1)
    })

    function beforeEnter(element) {
      requestAnimationFrame(() => {
        if (!element.style[cssValue.value]) {
          element.style[cssValue.value] = '0px'
        }

        element.style.display = null
      })
    }

    function enter(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const scrollOffset = element[`scroll${cssValueCapitalised.value}`]
          element.style[cssValue.value] = `${scrollOffset}px`
        })
      })
    }

    function afterEnter(element) {
      element.style[cssValue.value] = null
    }

    function beforeLeave(element) {
      requestAnimationFrame(() => {
        if (!element.style[cssValue.value]) {
          const offset = element[`offset${cssValueCapitalised.value}`]
          element.style[cssValue.value] = `${offset}px`
        }
      })
    }

    function leave(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style[cssValue.value] = '0px'
        })
      })
    }

    function afterLeave(element) {
      element.style[cssValue.value] = null
    }

    return {
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
    }
  },
})
</script>

<style lang="scss">
.transition {
  &__enter-active,
  &__leave-active {
    @apply tw-ease-linear;
    @apply tw-overflow-hidden;
  }

  &--horizontal {
    transition-property: width;
  }

  &--vertical {
    transition-property: height;
  }

  &--slow {
    @apply tw-duration-1000;
  }

  &--medium {
    @apply tw-duration-500;
  }

  &--fast {
    @apply tw-duration-100;
  }
}
</style>
