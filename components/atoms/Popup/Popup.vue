<template>
  <div ref="activator" class="popup__activator">
    <slot name="activator" :togglePopup="togglePopup" />

    <div
      v-if="isActive"
      ref="content"
      class="popup__content"
      :style="`left: ${left}; top: ${top};`"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
import { useResizeObserver, onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'PvPoupup',
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator: (v) => ['top', 'bottom'].includes(v),
    },
  },
  setup(props, { refs }) {
    const isActive = ref(false)

    const dimensions = reactive({
      activator: { height: 0, width: 0, offsetLeft: 0, offsetTop: 0 },
      content: { width: 0, height: 0 },
    })

    const getElementPosition = (el) => {
      const rect = el.getBoundingClientRect()
      const styles = window.getComputedStyle(el)

      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        offsetLeft: el.offsetLeft,
        offsetTop: el.offsetTop,
        marginTop: parseFloat(styles['marginTop']),
        marginBottom: parseFloat(styles['marginBottom']),
        marginLeft: parseFloat(styles['marginLeft']),
        marginRight: parseFloat(styles['marginRight']),
      }
    }

    const updateDimensions = () => {
      if (refs.activator) {
        dimensions.activator = getElementPosition(refs.activator)
      }

      if (refs.content) {
        dimensions.content = getElementPosition(refs.content)
      }
    }

    onMounted(() => {
      updateDimensions()
      useResizeObserver(window.document.body, updateDimensions)
    })

    const calcXOverflow = (left, contentWidth) => {
      const pageWidth = document.documentElement.clientWidth
      const xOverflow = left + contentWidth - pageWidth

      return xOverflow > 0 ? Math.max(left - xOverflow, 0) : Math.max(left, 0)
    }

    const left = computed(() => {
      const { activator, content } = dimensions
      const widthActivator = activator.width
      const widthContent = content.width
      const marginContent = content.marginLeft + content.marginRight
      const posLeft =
        activator.offsetLeft +
        widthActivator / 2 -
        widthContent / 2 -
        content.marginLeft
      return `${calcXOverflow(posLeft, widthContent + marginContent)}px`
    })

    const isBottom = computed(() => props.position === 'bottom')

    const top = computed(() => {
      const { activator, content } = dimensions
      const fullContentHeight =
        content.height + content.marginTop + content.marginBottom

      const posTop =
        activator.offsetTop +
        (isBottom.value ? activator.height : -fullContentHeight)

      return `${posTop}px`
    })

    let stopFunction = null

    const closePopup = () => {
      isActive.value = false
      stopFunction?.()
      stopFunction = null
    }

    const openPopup = () => {
      isActive.value = true
      requestAnimationFrame(() => {
        updateDimensions()
        stopFunction = onClickOutside(refs.activator, closePopup)
      })
    }

    const togglePopup = () => (isActive.value ? closePopup() : openPopup())

    return {
      isActive,
      left,
      top,
      togglePopup,
    }
  },
})
</script>

<style lang="scss">
.popup {
  &__activator {
    @apply tw-inline-flex;
  }

  &__content {
    @apply tw-m-0.5;
    @apply tw-absolute;
    @apply tw-bg-pv-white;
    @apply tw-border-2;
    @apply tw-border-pv-grey-80;
    @apply tw-rounded;
    @apply tw-overflow-x-auto;
    @apply tw-overflow-y-hidden;
    @apply tw-z-30;
    max-width: calc(100vw - 4px);
  }
}
</style>
