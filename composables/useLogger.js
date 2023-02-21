import consola from 'consola'
import nuxtConfig from '../nuxt.config'
import { getCurrentInstance, useContext } from '@nuxtjs/composition-api'

let initialized = false

const initializeLogger = (config) => {
  if (!initialized) {
    initialized = true
    consola
      .create({
        level: config.CONSOLA_LEVEL || 4,
      })
      .wrapConsole() // wrap regular console to consola
  }
}

/**
 * Creates a logger as wrapper for console object to add additional log information
 * @param file - the file the logger is used in
 * @return {object} with log functions (same as console)
 */
const getLoggerFor = (file) => {
  const Logger = {}
  Object.keys(console).forEach((key) => {
    if (typeof console[key] === 'function') {
      Logger[key] = function () {
        const prefix = `[${file}]`
        const dateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3,
          hour12: false,
        }
        const timestamp = `[${new Date().toLocaleString(
          'de-de',
          dateTimeFormatOptions
        )}]`
        const logParameters = [timestamp, prefix, ...arguments]
        console[key].apply(null, logParameters)
      }
    }
  })
  return Logger
}

export const useLogger = (name) => {
  let config

  try {
    const { $config } = useContext()
    config = $config
  } catch (e) {
    // here we catch an error from the Composition API which occurs in the server-middlewares,
    // because we do not have any context there, but we use the logger.
    config = nuxtConfig.publicRuntimeConfig
  }

  initializeLogger(config)
  const loggerName = name ? name : getCurrentInstance()?.proxy?.$options?.name
  const logger = getLoggerFor(loggerName)
  return { logger }
}
