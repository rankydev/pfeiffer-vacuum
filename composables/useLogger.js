import { useContext, getCurrentInstance } from '@nuxtjs/composition-api'

export const useLogger = () => {
  const { app } = useContext()
  const logger = app.$getLoggerFor(getCurrentInstance()?.proxy?.$options?.name)

  return { logger }
}
