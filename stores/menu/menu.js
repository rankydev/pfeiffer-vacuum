import { ref, readonly } from '@nuxtjs/composition-api'
import { onClickOutside } from '@vueuse/core'
import { useLogger } from '~/composables/useLogger'

const isActive = ref(false)

let windowWidth = null
let hasResizeListener = false
let removeClickListener = null

const openMenu = (target) => {
  const { logger } = useLogger('menu-store')

  if (isActive.value) return

  isActive.value = true

  setTimeout(() => {
    removeClickListener?.()

    if (target) {
      removeClickListener = onClickOutside(target, closeMenu)
    } else {
      logger.warn(
        "Click outside event listener can't be registered. No taget provided."
      )
    }

    addEventListener('keydown', closeMenuEsc)

    windowWidth = window.innerWidth

    if (hasResizeListener) return
    hasResizeListener = true
    addEventListener('resize', closeWindowOnResize, { passive: true })
  }, 0)
}

const closeWindowOnResize = () => {
  /* istanbul ignore next */
  if (!isActive.value) return

  const newWidth = window.innerWidth

  if (newWidth !== windowWidth) closeMenu()
}

const closeMenu = () => {
  if (!isActive.value) return

  isActive.value = false

  removeClickListener?.()
  removeClickListener = null

  removeEventListener('keydown', closeMenuEsc)
}

const closeMenuEsc = ($event) => $event.key === 'Escape' && closeMenu()

const toggleMenu = (target) =>
  !isActive.value ? openMenu(target) : closeMenu()

export const useMenuStore = () => ({
  isActive: readonly(isActive),
  toggle: toggleMenu,
  open: openMenu,
  close: closeMenu,
})
