import { ref, readonly } from '@nuxtjs/composition-api'

const isActive = ref(false)
let hasResizeListener = false

const openMenu = () => {
  if (isActive.value) return

  isActive.value = true
  setTimeout(() => {
    addEventListener('click', closeMenu)
    addEventListener('keydown', closeMenuEsc)

    if (hasResizeListener) return
    hasResizeListener = true
    addEventListener('resize', closeMenu, { passive: true })
  }, 0)
}

const closeMenu = () => {
  if (!isActive.value) return

  isActive.value = false
  removeEventListener('click', closeMenu)
  removeEventListener('keydown', closeMenuEsc)
}

const closeMenuEsc = ($event) => $event.key === 'Escape' && closeMenu()

const toggleMenu = () => (!isActive.value ? openMenu() : closeMenu())

export const useMenuStore = () => ({
  isActive: readonly(isActive),
  toggle: toggleMenu,
  open: openMenu,
  close: closeMenu,
})
