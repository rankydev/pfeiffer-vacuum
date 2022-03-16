import { ref, readonly } from '@nuxtjs/composition-api'

const isActive = ref(false)
const hasResizeListener = false

const openMenu = () => {
  if (isActive.value) return

  isActive.value = true
  setTimeout(() => {
    addEventListener('click', closeMenu)
  }, 0)

  if (hasResizeListener) return

  addEventListener('resize', closeMenu, { passive: true })
}

const closeMenu = () => {
  if (!isActive.value) return

  isActive.value = false
  removeEventListener('click', closeMenu)
}

const toggleMenu = () => (!isActive.value ? openMenu() : closeMenu())

export const useMenuStore = () => ({
  isActive: readonly(isActive),
  toggle: toggleMenu,
  open: openMenu,
  close: closeMenu,
})
