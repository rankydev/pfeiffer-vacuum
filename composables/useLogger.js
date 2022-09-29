import { getCurrentInstance } from '@nuxtjs/composition-api'
import getLoggerFor from '~/utils/getLoggerFor'

export const useLogger = (name) => {
  const loggerName = name ? name : getCurrentInstance()?.proxy?.$options?.name
  const logger = getLoggerFor(loggerName)
  return { logger }
}
