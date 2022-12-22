import { useContext } from '@nuxtjs/composition-api'

export const useTooltip = () => {
  const { app } = useContext()
  const { isMobile } = app.$breakpoints
  console.log(isMobile.value)

  const getTooltip = (vTooltipConfig = {}) => {
    return {
      content: 'default content',
      trigger: isMobile.value ? 'click' : 'hover',
      placement: 'top',
      ...vTooltipConfig,
    }
  }

  return {
    getTooltip,
  }
}
