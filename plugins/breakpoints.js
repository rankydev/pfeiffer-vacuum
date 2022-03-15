import { computed, ref, readonly } from '@nuxtjs/composition-api'

export default (context, inject) => {
  const current = ref('lg')

  if (process.client) {
    console.log('here')
    const loadCss = () => window.getComputedStyle(document.body, ':before')
    const getBreakpoint = () => loadCss().content.replace(/\"/g, '')

    current.value = getBreakpoint()
    console.log('what')

    const cb = () => (current.value = getBreakpoint())
    window.addEventListener('resize', cb, false)
  }

  const isMobile = computed(() => ['sm'].includes(current.value))
  const isTablet = computed(() => ['md'].includes(current.value))
  const isDesktop = computed(() => ['lg', 'xl'].includes(current.value))

  inject('breakpoints', {
    current: readonly(current),
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
  })
}
