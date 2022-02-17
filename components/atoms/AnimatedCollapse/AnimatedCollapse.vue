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
export default {
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: (val) => ['vertical', 'horizontal'].includes(val),
    },
    speed: {
      type: String,
      default: 'medium',
      validator: (val) => ['slow', 'medium', 'fast'].includes(val),
    },
  },
  computed: {
    cssValue() {
      return this.vertical ? 'height' : 'width'
    },
    cssValueCapitalised() {
      return this.cssValue.charAt(0).toUpperCase() + this.cssValue.slice(1)
    },
  },
  methods: {
    beforeEnter(element) {
      requestAnimationFrame(() => {
        if (!element.style[this.cssValue]) {
          element.style[this.cssValue] = '0px'
        }

        element.style.display = null
        console.log('style')
      })
    },
    enter(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const scrollOffset = element[`scroll${this.cssValueCapitalised}`]
          console.log('enter', element, element[`scroll${this.cssValue}`])
          element.style[this.cssValue] = `${scrollOffset}px`
        })
      })
    },
    afterEnter(element) {
      element.style[this.cssValue] = null
    },
    beforeLeave(element) {
      requestAnimationFrame(() => {
        if (!element.style[this.cssValue]) {
          const offset = element[`offset${this.cssValueCapitalised}`]
          element.style[this.cssValue] = `${offset}px`
        }
      })
    },
    leave(element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style[this.cssValue] = '0px'
        })
      })
    },
    afterLeave(element) {
      element.style[this.cssValue] = null
    },
  },
}
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
