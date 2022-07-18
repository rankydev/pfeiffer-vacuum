import Vue from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
const consola = require('consola')

let initialized = false

/**
 * Initialized the consola and wraps all console-calls to consola.
 */
export function init() {
  if (!initialized) {
    initialized = true
    consola
      .create({
        level: process.env.CONSOLA_LEVEL || 4,
      })
      .wrapConsole() // wrap regular console to consola
  }
}

/**
 * Creates a logger as wrapper for console object to add additional log information
 * @param label - the log label
 * @return {object} with log functions (same as console)
 */
export function getLogger(label) {
  const Logger = {}
  Object.keys(console).forEach((key) => {
    if (typeof console[key] === 'function') {
      Logger[key] = function () {
        const prefix = `[${label}]` // log prefix
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
        )}]` // log timestamp
        const logParameters = [timestamp, prefix, ...arguments] // log arguments
        console[key].apply(null, logParameters)
      }
    }
  })
  return Logger
}

export default (ctx) => {
  const { app, store } = ctx

  init()

  const logger = getLogger()

  Vue.prototype.$logger = logger

  app.$logger = logger
  ctx.$logger = logger
  if (store) {
    store.$logger = logger
  }
}
