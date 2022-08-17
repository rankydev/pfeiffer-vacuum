import { ref, readonly } from '@nuxtjs/composition-api'

const isActive = ref(false)
let hasResizeListener = false

const openMenu = () => {
  if (isActive.value) return

  isActive.value = true
  setTimeout(() => {
    addEventListener('click', closeMenu)
    addEventListener('touchend', closeMenu)
    addEventListener('keydown', closeMenuEsc)

    if (hasResizeListener) return
    hasResizeListener = true
    addEventListener('resize', closeMenu, { passive: true })
  }, 0)
}

const closeMenu = (e) => {
  if (!isActive.value) return

  /*
   * if className is string and includes defined class, navItem was clicked
   * burger-icon returns animatedSVGClassname as object
   */
  if (e) {
    const className = e.target?.className

    if (typeof className === 'string' && className.includes('primary-nav'))
      return

    if (className?.baseVal && className?.baseVal.includes('burger-icon')) {
      e.preventDefault()
    }
  }

  isActive.value = false
  removeEventListener('click', closeMenu)
  removeEventListener('touchend', closeMenu)
  removeEventListener('keydown', closeMenuEsc)
}

const closeMenuEsc = ($event) => $event.key === 'Escape' && closeMenu()

const toggleMenu = (e) => (!isActive.value ? openMenu() : closeMenu(e))

export const useMenuStore = () => ({
  isActive: readonly(isActive),
  toggle: toggleMenu,
  open: openMenu,
  close: closeMenu,
})
